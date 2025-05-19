import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userName, password } = await req.json();

    const isUser = await prisma.user.findUnique({
      where: {
        userName: userName,
      },
    });

    if (!isUser) {
      return NextResponse.json({
        message: "UserName Or Password is Incorrect!!",
        success: false,
      });
    }

    const isPassword = bcrypt.compareSync(password, isUser.password);

    if (!isPassword) {
      return NextResponse.json({
        message: "UserName Or Password is Incorrect!!",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        userId: isUser.id,
      },
      process.env.SECRET_KEY!,
      { expiresIn: "7d" }
    );

    console.log(token);
    const cookie = serialize("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
      },
    });
  } catch (error) {
    console.log(`error in signin api... ${error}`);
  }
}
