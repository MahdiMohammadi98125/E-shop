import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    const user = await prisma.user.findUnique({ where: { email: email } });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
