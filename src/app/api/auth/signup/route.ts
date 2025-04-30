import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma.js";
import { signUpSchema } from "@/Schema/AuthShema";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    let userData = await req.json();
    const parsedData = signUpSchema.parse(userData);
    const existingUser = await prisma.user.findUnique({
      where: { email: parsedData.email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }
    // password ency
    const hashedpassword = await bcrypt.hash(parsedData.Password, 10);
    const newUser = await prisma.user.create({
      data: {
        fullname: parsedData.fullname,
        email: parsedData.email,
        password: hashedpassword,
        Role: "customer",
        Addreess: parsedData.Address,
        countryCode: parsedData.CountryCode,
        Phone: parsedData.phone,
        Preferance: parsedData.preferance,
      },
    });
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation Failed",
          errors: error.errors,
        },
        { status: 400 }
      );
    }
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Something went wrong during registration" },
      { status: 500 }
    );
  }
}
