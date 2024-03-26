import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const body = await request.json();
  const { id, deliveryStatus } = body;
  const order = await prisma.order.update({
    where: { id },
    data: { deliveryStatus },
  });
  return NextResponse.json({ order });
}
