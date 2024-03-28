import { getCurrentUser } from "@/actions/getCurrentUser";
import { getOrderByUserId } from "@/actions/getOrderByUserId";
import React from "react";
import Container from "../components/Container";
import OrderClients from "./OrderClients";
import NullData from "../components/NullData";

export default async function OrdersPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return <NullData title="Oops access denied!" />;
  const orders = await getOrderByUserId(currentUser.id);
  if (!orders) return <NullData title="No orders yet..." />;
  return (
    <div className="pt-8">
      <Container>
        <OrderClients orders={orders} />
      </Container>
    </div>
  );
}
