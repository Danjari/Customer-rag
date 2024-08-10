//this is the bedrock sdk, basically makes it easy to use nextjs with bedrock
import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { streamText, generateText } from "ai";
//these are functions from the ai library for text gen
import { NextResponse } from "next/server";

//just a get request here, when you make the chat make sure to adjust to a post request
export async function GET(request) {
  try {
    //create the instance
    const bedrock = createAmazonBedrock({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    //generate text, we are using llama3
    const { text } = await generateText({
      model: bedrock("meta.llama3-70b-instruct-v1:0"),
      prompt: "Write a vegetarian lasagna recipe for 4 people",
    });

    // Return the response as a NextResponse object
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error generating text:", error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 },
    );
  }
}
