
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { StreamingTextResponse, OpenAIStream } from "ai"; // Import necessary functions from the AI library

// Define the system prompt that the AI will use as a context for the conversation
const systemPrompt =
  "You are the Headstarter AI Company Assistant. Headstarter is a pioneering company that reinvents the technical interview learning process by incorporating AI into real-time coding interview practices. Your role is to assist users with information about Headstarter’s services, guide them through coding interview preparations, answer technical questions, and provide real-time feedback during coding exercises. You should always be professional, knowledgeable, and supportive, focusing on enhancing the user’s learning experience and helping them succeed in their technical interviews. Your goal is to provide accurate and helpful responses, ensuring that the user has a positive learning experience and achieves their goals.";

export async function POST(request) {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Use the API key stored in the environment variables
  });

  // Parse the incoming JSON data from the request
  const data = await request.json();
  console.log("Received data:", data); // Log the received data for debugging purposes

  const { messages } = data;

  // Ensure that the messages field is an array
  if (!Array.isArray(messages)) {
    console.error("Messages is not an array:", messages);
    return new NextResponse("Expected an array of messages", { status: 400 });
  }

  // Create a completion stream from the OpenAI API with the given messages and system prompt
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Specify the AI model to use
    messages: [
      {
        role: "system",
        content: systemPrompt, // Add the system prompt to the conversation context
      },
      ...messages, // Include the user-provided messages
    ],
    stream: true, // Enable streaming for real-time responses
  });

  // Convert the OpenAI completion stream into a readable stream that can be sent as a response
  const stream = await OpenAIStream(completion);

  // Return the streaming response to the client
  return new StreamingTextResponse(stream);

}
