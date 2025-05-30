import { parseJSONObjectFromText } from '@/lib/parsing';
import { openai } from '@ai-sdk/openai';
import { CoreMessage, generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { content, media } = body;
        console.log("⬇️ analysis content:", content);
        // generate image description
        const messages: CoreMessage[] = [
            {
                role: "system",
                content: `You are a content creator and create a piece of content based on the following\n`
                    + `\nResponse format should be formatted in a valid JSON block like this:
\`\`\`json
{ "theme": "<string>", "keywords": "<string[3-5]>", "text": "<string>" }
\`\`\`

The "theme" field should be categorization of content themes,short and concise.
The "keywords" field should be an array of keywords that are relevant to the content.
The "text" field should be the content of the piece of content,short and concise.

The content should be in the language of the user.`
            },
            {
                role: "user",
                content: [
                    { type: "text", text: content },
                    { type: "image", image: media[0].data, mimeType: media[0].type }
                ],
            }
        ];

        const result = await generateText({
            model: openai('gpt-4o-mini'),
            messages
        });

        const analysisResult = parseJSONObjectFromText(result.text);

        return NextResponse.json({
            analysisResult,
            reasoning: result.reasoning
        });
    } catch (error) {
        console.error('Error generating content:', error);
        return NextResponse.json(
            { error: 'Error occurred while generating content', message: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
} 