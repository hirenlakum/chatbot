import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()


export async function GET(req:Request){
    try {
        
        const userId = req.headers.get("userId")
      const chatHistory=  await prisma.message.findMany({
            where:{
                userId:userId!
            }
        })

        if(chatHistory){
            return NextResponse.json({message:"chat history fetch successfully",history:chatHistory})
        }

    } catch (error) {
        console.log(`error while fetching  user chat history ${error}`)
        return NextResponse.json({
            message:"Error while Fetching user Fetch History"
        })
    }
}