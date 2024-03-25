import Container from "@/app/components/Container";
import React from "react";
import AddProductForm from "./AddProductForm";
import FormWrap from "@/app/components/FormWrap";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

export default async function AddProducts() {
  const currentUser = await getCurrentUser();
  const admin = currentUser?.role === "ADMIN";
  if (!currentUser || !admin) {
    return <NullData title="Oops! Access Denied!" />;
  }
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
}
