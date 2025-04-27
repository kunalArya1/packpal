import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma.js";

export async function GET(req: NextRequest) {
  const newUser = await prisma.user.create({
    data: { name: "kunal Arya", email: "kunalkrraj@gmail.com" },
  });
  return NextResponse.json(
    {
      message: "kunal Arya",
    },
    { status: 200 }
  );
}
