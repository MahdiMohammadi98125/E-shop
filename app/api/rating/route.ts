import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "User not found!" }, { status: 404 });
  }
  const body = await request.json();
  const { comment, rating, product, userId } = body;

  const deliveredOrder = currentUser.orders.some(
    (order) =>
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus === "delivered"
  );
  const userReview = product.reviews.find(
    (review: Review) => review.userId === currentUser.id
  );
  if (userReview && !deliveredOrder) {
    return NextResponse.json("review already exists or order delivered!");
  }
  const review = await prisma.review.create({
    data: {
      comment,
      rating,
      productId: product.id,
      userId,
    },
  });
  return NextResponse.json(review);
}
