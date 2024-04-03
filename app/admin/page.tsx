import React from "react";
import Container from "../components/Container";
import Summary from "./Summary";
import { getProducts } from "@/actions/getProducts";
import { getOrders } from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import BarGraph from "./BarGraph";
import getGraphData from "@/actions/getGraphData";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/NullData";

export default async function Admin() {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  const barGraphData = await getGraphData();
  const currentUser = await getCurrentUser();

  if (currentUser?.role !== "ADMIN") {
    return <NullData title="Oops access denied!" />;
  }
  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />
        <div className="max-w-[1150px] m-auto mt-4">
          <BarGraph data={barGraphData} />
        </div>
      </Container>
    </div>
  );
}

export const revalidate = 0; // revalidate the route
