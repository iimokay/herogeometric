import { openai } from '@ai-sdk/openai';
import { CoreMessage, generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { content, media, } = body;
        // Use regex to match MIME type
        const regex = /data:([^;]+);/;
        const match = media.match(regex);
        const mimeType = match && match[1] ? match[1] : "image/jpeg";
        console.log("⬇️ analysis content:", content, media.substring(0, 50), mimeType);
        // generate image description
        const messages: CoreMessage[] = [
            {
                role: "system",
                content: "I'm a helpful assistant that can help you analyze the image."
            },
            {
                role: "user",
                content: [{ type: "image", image: media, mimeType }],
            },
        ];

        const descriptionResult = await generateText({
            model: openai('gpt-4o-mini'),
            messages
        });

        return NextResponse.json({
            imageDescription: descriptionResult.text,
            content: content,
            reasoning: descriptionResult.reasoning
        });
    } catch (error) {
        console.error('Error generating content:', error);
        return NextResponse.json(
            { error: 'Error occurred while generating content', message: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
} 