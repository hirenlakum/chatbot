import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()

export async function POST(req:Request){
  try {
     const userId = req.headers.get("userId");
  console.log("User ID from middleware:", userId);
  
    const {messages} = await req.json()

    

    let latestPrompt = messages[messages.length-1]
  

    console.log('my api key',process.env.GOOGLE_GENERATIVE_AI_API_KEY)


    const results =  streamText({
      model:google('gemini-2.0-flash'),
      prompt:latestPrompt.content,
      async onFinish(finalResponse) {
        await prisma.message.create({
          data: {
            content: latestPrompt.content,
            responce: finalResponse.text,
            userId: userId!,
          },
        });
      },
      
    })

return results.toDataStreamResponse()
    
 
  } catch (error) {
    console.log('error in google gemini model',error)
    return JSON.stringify({
      message:"Error In Google gemini responce..."
    })
  }
}
