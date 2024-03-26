import Container from "@/app/components/Container";
import React from "react";
import ManageProductClients from "./ManageProductClients";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import { getProducts } from "@/actions/getProducts";

export default async function ManageProducts() {
  const products = await getProducts({
    category: null,
  });

  // protecting the manage product page
  const currentUser = await getCurrentUser();
  const admin = currentUser?.role === "ADMIN";
  if (!currentUser || !admin) {
    return <NullData title="Oops! Access Denied!" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <ManageProductClients products={products} />
      </Container>
    </div>
  );
}
