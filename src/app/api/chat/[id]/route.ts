import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { PrismaClient } from "@/generated/prisma";
import { converSationBody } from "@/app/types/page";
const prisma = new PrismaClient();

export async function POST(req: Request, context: { params: { id: string } }) {
  try {
    const userId = req.headers.get("userId");

    const conversatggionId = context.params.id;

    const { messages } = await req.json();
  

    let latestPrompt = messages[messages.length - 1];
    
    let ccid;

    const isAlreadyConversation = await prisma.conversation.findUnique({
      where: {
        conid: conversatggionId,
      },
    });

    if (!isAlreadyConversation) {
      const createId = await prisma.conversation.create({
        data: {
          userId: userId!,
          conid: conversatggionId,
        },
      });

      ccid = createId.conid;
    } else {
      ccid = conversatggionId;
    }

    console.log(isAlreadyConversation);

    const results = streamText({
      model: google("gemini-2.0-flash"),
      messages: messages,
      async onFinish(finalResponse) {
        console.log("onfinish start");
        try {
          const newMessage = await prisma.message.createMany({
            data: [
              {
                content: latestPrompt.content,
                responce: "",
                conversationId: ccid,
                role: "user",
              },

              {
                content: "",
                responce: finalResponse.text,
                conversationId: ccid,
                role: "assistant",
              },
            ],
          });
          console.log(newMessage);
        } catch (error) {
          console.log(`error in prisma ${error}`);
        }

        console.log("onfinish end ..");
      },
    });

    return results.toDataStreamResponse();
  } catch (error) {
    console.log("error in google gemini model", error);
    return JSON.stringify({
      message: "Error In Google gemini responce...",
    });
  }
}
