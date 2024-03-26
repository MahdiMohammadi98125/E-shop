import prisma from "@/libs/prismadb";

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdDate: "desc",
      },
    });
    return orders;
  } catch (error) {
    throw new Error(error as string);
  }
}
