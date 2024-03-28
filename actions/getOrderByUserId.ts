import prisma from "@/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export async function getOrderByUserId(userId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }
    const order = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdDate: "desc",
      },
      where: {
        userId: userId,
      },
    });
    return order;
  } catch (error: any) {
    throw new Error(error);
  }
}
