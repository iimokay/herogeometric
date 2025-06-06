import { parseJSONObjectFromText } from "@/lib/parsing"
import { prisma } from "@/lib/prisma"
import { openai } from "@ai-sdk/openai"
import RunwayML from "@runwayml/sdk"
import { generateText } from "ai"
import { NextResponse } from "next/server"

const client = new RunwayML()

export async function POST(req: Request) {
  try {
    const { content, mediaArray, productId } = await req.json()
    if (!content || !mediaArray) {
      return NextResponse.json(
        { error: "Prompt cannot be empty" },
        { status: 400 }
      )
    }
    const product = await prisma.adMaterial.findUnique({
      where: {
        id: productId
      }
    })
    const prompt = `Product ads are embedded in the content\n\n` +
      `content: ${content}\n` +
      `product ads description: ${product?.description}\n\n` +
      `The content should be in the language of the user.\n\n` +
      `Response format should be formatted in a valid JSON block like this:
\`\`\`json
{ "smooth": "<string>", "direct": "<string>" }
\`\`\`

The "smooth" field should be the smoothness of smooth the product ads in the content.
The "direct" field should be the directness of original text is kept as unchanged as possible`

    const result = await generateText({
      model: openai('gpt-4o-mini'),
      prompt
    });
    const { smooth, direct } = parseJSONObjectFromText(result.text) as { smooth: string, direct: string };

    // Create image generation task
    const textToImage = await client.textToImage.create({
      model: "gen4_image",
      promptText: `Do not modify the original image, and add product to the original image reasonably`,
      ratio: "1024:1024",
      referenceImages: [
        {
          uri: mediaArray[0].data,
          tag: "original",
        },
        {
          uri: product?.images[0],
          tag: "product",
        }
      ],
    })
    // Return generated image
    return NextResponse.json({ ...textToImage, reasoning: result.reasoning, content: { smooth, direct } })
  } catch (error) {
    console.error("Error generating image:", error)
    return NextResponse.json(
      { error: "Error occurred during image generation" },
      { status: 500 }
    )
  }
} 