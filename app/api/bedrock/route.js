import { bedrock } from "@ai-sdk/amazon-bedrock";
import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import {
  generateText,
  streamText,
  convertToCoreMessage,
  convertToCoreMessages,
} from "ai";
import { NextResponse } from "next/server";

const systemPrompt =
  "You are the Headstarter AI Company Assistant. Headstarter is a pioneering company that reinvents the technical interview learning process by incorporating AI into real-time coding interview practices. Your role is to assist users with information about Headstarter services, guide them through coding interview preparations, answer technical questions, and provide real-time feedback during coding exercises. You should always be professional, knowledgeable, and supportive, focusing on enhancing the user’s learning experience and helping them succeed in their technical interviews. Your goal is to provide accurate and helpful responses, ensuring that the user has a positive learning experience and achieves their goals.";
 

export async function POST(request) {
  try {
    const bedrock = createAmazonBedrock({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const { messages } = await request.json();
    const result = await streamText({
      model: bedrock("meta.llama3-70b-instruct-v1:0"),
      system: systemPrompt,
      messages: convertToCoreMessages(messages),
    });
    return result.toDataStreamResponse();
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 },
    );
  }
}
