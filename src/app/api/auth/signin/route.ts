import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prisma.js";
import { signInSchema } from "@/Schema/AuthShema";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const userData = await req.json();
    const parsedData = signInSchema.parse(userData);
    const user = await prisma.user.findUnique({
      data: { email: parsedData.email },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not registred with this email",
        },
        { status: 401 }
      );
    }
    const checkPassword = bcrypt.compare(parsedData.Password, user.passord);
    if (!checkPassword) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }
    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET || "fallback-secret-key", // Use environment variable for security
      { expiresIn: "24h" }
    );
    // Return user info and token (excluding sensitive data)
    return NextResponse.json(
      {
        message: "Sign in successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
      { status: 200 }
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
  }
}
