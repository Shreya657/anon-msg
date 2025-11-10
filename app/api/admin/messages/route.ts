import { PrismaClient } from "@/app/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma=new PrismaClient()

//to fill the form---POST  method
export async function POST(request:NextRequest){
    try{
        const {content,name}=await request.json();
        if(!content || content.trim()===""|| !name ||name.trim()===""){
            return NextResponse.json({error:"message and name cant be empty"},{status:400})
        }
        const message=await prisma.message.create({
            data:{content,name}
        })
        return NextResponse.json({message,msg:"message sent successfully"})
    }catch(err){
        return NextResponse.json({error:"something went wrong"},{status:500})
    }
}






//to get all the msgs -----GET method
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization"); // expects "Bearer YOUR_SECRET"

  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ messages });
}


    