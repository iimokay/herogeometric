import { prisma } from "@/lib/prisma"
import RunwayML from "@runwayml/sdk"
import { NextResponse } from "next/server"

const client = new RunwayML()

export async function POST(req: Request) {
  try {
    const { content, imageDescription, productId } = await req.json()
    if (!content || !imageDescription) {
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
    // Create image generation task
    const textToImage = await client.textToImage.create({
      model: "gen4_image",
      promptText: `content: ${content}\n\n
      image description: ${imageDescription}`,
      ratio: "1024:1024",
      referenceImages: product?.images.map(image => ({
        uri: image,
        tag: "reference",
      })),
    })
    // Return generated image
    return NextResponse.json(textToImage)
  } catch (error) {
    console.error("Error generating image:", error)
    return NextResponse.json(
      { error: "Error occurred during image generation" },
      { status: 500 }
    )
  }
} 