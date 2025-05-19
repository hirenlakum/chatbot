import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()

export async function GET(req:Request){
    try {
        
        const userId = req.headers.get("userId")
        console.log('this is the userId',userId)
        const chatHistory = await prisma.user.findUnique({
        where:{
            id:userId!
        },
        include:{
            conversations:{
                include:{
                    messages:true
                }
            }
        }
        })

        if(chatHistory){
            return NextResponse.json({message:"fetch successfully",history:chatHistory})
        }
    } catch (error) {
        console.log(`error while fetching user chat history...`)
    }
}