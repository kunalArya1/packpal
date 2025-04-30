import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma.js";
import { signUpSchema } from "@/Schema/AuthShema";

export async function POST(req: NextRequest) {
  let userData = await req.json();

  try {
    const parsedData = signUpSchema.parse(userData);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Validation Failed",
        errors: error,
      },
      { status: 400 }
    );
  }

  const newUser = await prisma.user.create({
    data: { name: "kunal Arya", email: "kunalkrraj@gmail.com" },
  });

  console.log(userData);
  return NextResponse.json(
    {
      message: "kunal Arya",
    },
    { status: 200 }
  );
}
