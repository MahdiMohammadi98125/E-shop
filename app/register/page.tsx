import React from "react";
import RegisterForm from "./RegisterForm";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";

export default function RegisterPage() {
  return (
    <Container>
      <FormWrap>
        <RegisterForm />
      </FormWrap>
    </Container>
  );
}
