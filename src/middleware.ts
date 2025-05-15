

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";



interface jwtPayload{
  userId:string
}

export async function middleware(req: NextRequest) {



  const token = req.cookies.get("token")?.value;
  

  if (!token && req.nextUrl.pathname.startsWith("/")) {
   
    return NextResponse.redirect(new URL("/SignIn",req.url))
    
  }

  if(token && (req.nextUrl.pathname==="/SignIn"||req.nextUrl.pathname==="/SignUp")){
    return NextResponse.redirect(new URL("/",req.url))
  }

  try {
    const { payload } = await jwtVerify<jwtPayload>(token!, new TextEncoder().encode(process.env.SECRET_KEY!));
    console.log(payload)

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("userId", payload.userId);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Invalid token", success: false }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/chat","/api/each_user_chat","/","/SignUp","/SignIn"],
};
