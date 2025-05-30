import { prisma } from "@/lib/prisma";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { content, imageDescription } = await request.json();
    console.log("⬇️ search analysis:", content);
    const products = await prisma.adMaterial.findMany();
    if (!content) {
      return NextResponse.json(
        { error: "Analysis result cannot be empty" },
        { status: 400 }
      );
    }
    // generate ad text
    const prompt = `Given the following content analysis and product catalog, find the most relevant products:\n\n
      content: ${content}\n\n
      image description: ${imageDescription}\n\n
      Product Catalog: ${products.map(product => `ID: ${product.id} - Title: ${product.title} - Description: ${product.description}`).join('\n')}\n\n
    Just return the product ID value that fits best.`
    const result = await generateText({
      model: openai('gpt-4o-mini'),
      prompt
    });
    return NextResponse.json({ content, imageDescription, productId: result.text, reasoning: result.reasoning });
  } catch (error) {
    console.error("Error searching ads:", error);
    return NextResponse.json(
      { error: "Error occurred while searching ads" },
      { status: 500 }
    );
  }
} 