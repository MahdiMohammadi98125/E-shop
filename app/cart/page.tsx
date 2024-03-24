import React from "react";
import Container from "../components/Container";
import CartClient from "./CartClient";
import { getCurrentUser } from "@/actions/getCurrentUser";

export default async function CartPage() {
  const currentUser = await getCurrentUser();

  return (
    <div className="p-8">
      <Container>
        <CartClient currentUser={currentUser} />
      </Container>
    </div>
  );
}
