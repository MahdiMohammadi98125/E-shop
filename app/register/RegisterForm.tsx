"use client";
import { SafeUser } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineGoogle } from "react-icons/ai";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { signIn } from "next-auth/react";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

export default function RegisterForm({ currentUser }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("account created!");
        router.push("/cart");
      })
      .catch(() => {
        toast.error("something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // If the user is already logged in,
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  });

  if (currentUser) {
    return <p className="text-center">Logged In. Redirecting...</p>;
  }

  return (
    <>
      <Heading title="Sign up for E~shop" />
      <Button
        label="Sign up with Google"
        onClick={() => {
          signIn("google");
        }}
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
        id="email"
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
