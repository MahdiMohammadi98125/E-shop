"use client";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { AiOutlineGoogle } from "react-icons/ai";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", password: "" },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);
    console.log(data);
  };
  return (
    <>
      <Heading title="Login in for E~shop" />
      <Button
        label="Continue with Google"
        onClick={() => {}}
        outline
        icon={AiOutlineGoogle}
      />
      <hr className="w-full h-px bg-slate-300" />

      <Input
        id="eamil"
        label="Email"
        disabled={isLoading}
        errors={errors}
        register={register}
        required={true}
        type="email"
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        errors={errors}
        register={register}
        required={true}
        type="password"
      />
      <Button
        label={`${isLoading ? "Loading..." : "Login in"}`}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Dont have an account?{" "}
        <Link href="/login" className="underline">
          Register
        </Link>{" "}
        here.
      </p>
    </>
  );
}
