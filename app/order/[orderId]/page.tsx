import Container from "@/app/components/Container";
import React from "react";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface IPrams {
  orderId: string;
}

export default async function OrderDetailsPage({ params }: { params: IPrams }) {
  const order = await getOrderById(params);
  if (!order) return <NullData title="This order does not exist" />;
  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
}
