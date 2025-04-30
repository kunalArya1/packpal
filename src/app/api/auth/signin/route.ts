import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma.js";
import { signInSchema } from "@/Schema/AuthShema";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("Hello form the sign in");
  let userData = await req.json();

  try {
    const parsedData = signInSchema.parse(userData);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Validation Failed",
        errors: error,
      },
      {
        status: 400,
      }
    );
  }
  console.log(userData);

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
