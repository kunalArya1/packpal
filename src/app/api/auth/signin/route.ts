import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma.js";

export async function POST(req: NextRequest) {
  // const newUser = await prisma.user.create({
  //   data: { name: "kunal Arya", email: "kunalkrraj@gmail.com" },
  // });

  console.log("Hello form the sign in");
  let userData = await req.json();

  console.log(userData);
  
  return NextResponse.json(
    {
      message: "kunal Arya",
    },
    { status: 200 }
  );
}
