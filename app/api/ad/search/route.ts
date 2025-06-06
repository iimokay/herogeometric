import { parseJSONObjectFromText } from "@/lib/parsing";
import { prisma } from "@/lib/prisma";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { analysisResult } = await request.json();
    const { theme, keywords, text, objectsInImage, imageDescription } = analysisResult;
    console.log("⬇️ search analysis theme:", theme);
    console.log("⬇️ search analysis keywords:", keywords);
    console.log("⬇️ search analysis text:", text);
    console.log("⬇️ search analysis objectsInImage:", objectsInImage);
    console.log("⬇️ search analysis imageDescription:", imageDescription);
    const products = await prisma.adMaterial.findMany();
    if (!theme) {
      return NextResponse.json(
        { error: "Analysis result cannot be empty" },
        { status: 400 }
      );
    }
    // generate ad text
    const prompt = `Given the following content analysis and product catalog, find the most relevant products:\n\n
      theme: ${theme}\n
      keywords: ${keywords.join(',')}\n
      Product Catalog:
      ${products.map(product => `ID: ${product.id} - Title: ${product.title} - Description: ${product.description}`).join('\n')}\n\n`
      + `\nResponse format should be formatted in a valid JSON block like this:
    \`\`\`json
    { "productId": "<string>" , "reasoning": "<string>", "relevant": "<number>" }
    \`\`\`
    
    The "productId" field should be the product ID that is most relevant to the content.
    The "reasoning" field should be the reasoning for the product selection.
    The "relevant" field should be the relevance score of the product ID to the content, between 0 and 1.`
    const result = await generateText({
      model: openai('gpt-4o-mini'),
      prompt
    });
    const relevantProduct = parseJSONObjectFromText(result.text) as { productId: string, reasoning: string, relevant: number };
    return NextResponse.json({ relevantProduct, reasoning: result.reasoning });
  } catch (error) {
    console.error("Error searching ads:", error);
    return NextResponse.json(
      { error: "Error occurred while searching ads" },
      { status: 500 }
    );
  }
} 