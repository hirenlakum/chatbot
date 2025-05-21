import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET(req: Request) {
  try {
    const token = (await cookies()).get("token")?.value;

    const { payload } = await jwtVerify(
      token!,
      new TextEncoder().encode(process.env.SECRET_KEY)
    );

    const userId = payload.userId as string;
    console.log("this is the userId", userId);
    const chatHistory = await prisma.user.findUnique({
      where: {
        id: userId!,
      },
      include: {
        conversations: {
          include: {
            messages: true,
          },
        },
      },
    });

    if (chatHistory) {
      return NextResponse.json({
        message: "fetch successfully",
        history: chatHistory,
      });
    }
  } catch (error) {
    console.log(`error while fetching user chat history...`);
  }
}
