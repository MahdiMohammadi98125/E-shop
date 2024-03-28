import prisma from "@/libs/prismadb";

interface IParams {
  orderId?: string;
}

export default async function getOrderById(params: IParams) {
  const { orderId } = params;
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!orderId) return;
    return order;
  } catch (error: any) {
    throw new Error(error);
  }
}
