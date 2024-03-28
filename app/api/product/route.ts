import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.json(
      { error: "User is not Admin or User not found!" },
      { status: 404 }
    );
  }
  const body = await request.json();
  const { name, description, price, brand, category, inStock, images } = body;
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      brand,
      category,
      inStock,
      images,
    },
  });
  return NextResponse.json({ product });
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const body = await request.json();
  const { id, inStock } = body;
  const product = await prisma.product.update({
    where: { id },
    data: { inStock },
  });
  return NextResponse.json({ product });
}
