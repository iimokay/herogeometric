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
    const prompt = `Product ads are embedded in the content, and the original text is kept as unchanged as possible\n\n` +
      `content: ${content}\n` +
      `product ads description: ${product?.description}\n\n` +
      `The content should be in the language of the user.\n`

    const result = await generateText({
      model: openai('gpt-4o-mini'),
      prompt
    });

    // Create image generation task
    const textToImage = await client.textToImage.create({
      model: "gen4_image",
      promptText: `merge this two contents in a proper way,the original content should be kept as unchanged as possible`,
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
    return NextResponse.json({ ...textToImage, reasoning: result.reasoning, content: result.text })
  } catch (error) {
    console.error("Error generating image:", error)
    return NextResponse.json(
      { error: "Error occurred during image generation" },
      { status: 500 }
    )
  }
} 