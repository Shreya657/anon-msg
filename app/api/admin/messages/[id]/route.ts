import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


//to delete a data by its unique id------DELETE  method
export async function DELETE(req: NextRequest, context: any) {
  // Auth check
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Unwrap params
  const params = await context.params;
  const id = params?.id;

  if (!id) 
    return NextResponse.json({ error: "Message ID missing" }, { status: 400 });

  try {
    await prisma.message.delete({ where: { id } });
    return NextResponse.json({ msg: "Message deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Message not found or deletion failed" }, { status: 500 });
  }
}
