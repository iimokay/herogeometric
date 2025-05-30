import RunwayML from "@runwayml/sdk"
import { NextResponse } from "next/server"

const client = new RunwayML()

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    if (!id) {
      return NextResponse.json(
        { error: "ID cannot be empty" },
        { status: 400 }
      )
    }
    const task = await client.tasks.retrieve(id)
    // Return generated image
    return NextResponse.json({
      success: ["SUCCEEDED", "FAILED"].includes(task.status),
      image: task.output,
      status: task.status
    })

  } catch (error) {
    console.error("Error checking image generation status:", error)
    return NextResponse.json(
      { error: "Error occurred while checking image generation status" },
      { status: 500 }
    )
  }
} 