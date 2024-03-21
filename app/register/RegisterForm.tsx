"use client";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { AiOutlineGoogle } from "react-icons/ai";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);
    console.log(data);
  };
  return (
    <>
      <Heading title="Sign up for E~shop" />
      <Button
        label="Sign up with Google"
        onClick={() => {}}
        outline
        icon={AiOutlineGoogle}
      />
      <hr className="w-full h-px bg-slate-300" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        errors={errors}
        register={register}
        required={true}
        type="text"
      />
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
        label={`${isLoading ? "Loading..." : "Sign Up"}`}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>{" "}
        here.
      </p>
    </>
  );
}
