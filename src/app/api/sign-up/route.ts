import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userName, password } = await req.json();
    console.log(userName, password);

    const hashPassword = bcryptjs.hashSync(password, 10);

    const createUser = await prisma.user.create({
      data: {
        userName: userName,
        password: hashPassword,
      },
    });

    return NextResponse.json({
      message: "User Created!!!",
      success: true,
      createdUser: createUser,
    });
  } catch (error) {
    console.log(`Error While Sign up API... ${error}`);
  }
}
