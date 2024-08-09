import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt =
  "You are the Headstarter AI Company Assistant. Headstarter is a pioneering company that reinvents the technical interview learning process by incorporating AI into real-time coding interview practices. Your role is to assist users with information about Headstarter’s services, guide them through coding interview preparations, answer technical questions, and provide real-time feedback during coding exercises. You should always be professional, knowledgeable, and supportive, focusing on enhancing the user’s learning experience and helping them succeed in their technical interviews. Your goal is to provide accurate and helpful responses, ensuring that the user has a positive learning experience and achieves their goals.";

export async function POST(request) {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const data = await resquest.json();
  const completion = openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...data,
    ],
    model: "gpt-4o-mini",
    stream: true,
  });

  const stream = OpenAIStream(completion);
  return new StreamingTextResponse(stream);
}
