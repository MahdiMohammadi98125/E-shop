import React from "react";
import Container from "../Container";
import CartClient from "./CartClient";

export default function CartPage() {
  return (
    <div className="p-8">
      <Container>
        <CartClient />
      </Container>
    </div>
  );
}
