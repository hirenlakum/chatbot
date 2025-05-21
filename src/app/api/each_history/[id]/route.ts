import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const token = (await cookies()).get("token")?.value;

    const { payload } = await jwtVerify(
      token!,
      new TextEncoder().encode(process.env.SECRET_KEY)
    );

    const userId = payload.userId as string;

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
