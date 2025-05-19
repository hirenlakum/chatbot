import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

 
    const userId = req.headers.get("userId");
  

    const conversationWithMessages = await prisma.conversation.findUnique({
      where: {
        conid: id,
        userId: userId!,
      },
      include: {
        messages: true,
      },
    });

    if (!conversationWithMessages) {
      return NextResponse.json({ message: "no chat found" });
    }

    return NextResponse.json({
      message: "chat_fetch",
      each_chat: conversationWithMessages,
    });
  } catch (error) {
    console.log(`error while fetchng each_history... ${error}`);
  }
}
