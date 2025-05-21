import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { PrismaClient } from "@/generated/prisma";
import { converSationBody } from "@/app/types/page";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
const prisma = new PrismaClient();

export async function POST(req: Request, context: { params: { id: string } }) {
  try {
    const token = (await cookies()).get("token")?.value;

    const { payload } = await jwtVerify(
      token!,
      new TextEncoder().encode(process.env.SECRET_KEY)
    );

    const userId = payload.userId as string;

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

    console.log("conversation id:", isAlreadyConversation);

    const results = streamText({
      model: google("gemini-2.0-flash"),
      messages: messages,

      async onFinish(finalResponse) {
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
