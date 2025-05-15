import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()

interface paramsBody{
  id:string
}

interface Context{
  params:paramsBody
}

export async function GET(req:Request,{params}:Context){
    try {
      const id = await params.id

     const chat= await prisma.message.findUnique({
        where:{
          id:id
        }
      })

      if(chat){
        return Response.json({
          message:"Each chat fetch success",
          chat:chat
        })
      }
    } catch (error) {
      console.log(`error while fetching eachChat ${error}`)
    }
}
