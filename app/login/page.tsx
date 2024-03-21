import React from "react";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Container>
      <FormWrap>
        <LoginForm />
      </FormWrap>
    </Container>
  );
}
