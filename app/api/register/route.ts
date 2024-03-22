import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  //   destructure the fields from the body
  const { name, email, password } = body;
  //   return error if any of the fields are empty
  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Name, email and password are required" },
      { status: 400 }
    );
  }
  //   hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //   find the user based on the email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  //   if user does not exits create user
  if (!user) {
    await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
  } else {
    // else return error that the user already exists
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  return NextResponse.json(user);
}
