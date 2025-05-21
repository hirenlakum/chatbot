import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {jwtVerify} from "jose"


export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/SignIn", req.url));
  }

  try {


    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SECRET_KEY)
    )

    return NextResponse.next()
    }
   catch (error) {
    return NextResponse.json(
      { message: "Invalid token", success: false },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/",
    "/api/chat",
    "/api/user_chat_history",
    "/api/chat/:id",
    "/api/each_history/:id",
  ],
};
