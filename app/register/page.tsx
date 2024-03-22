import React from "react";
import RegisterForm from "./RegisterForm";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import { getCurrentUser } from "@/actions/getCurrentUser";

export default async function RegisterPage() {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <RegisterForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
}
