"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginFormProps {
  currentUser: SafeUser | null;
}

export default function LoginForm({ currentUser }: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", password: "" },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res?.ok) {
        router.replace("/cart");
        toast.success("Login successful");
      }
      if (res?.error) {
        toast.error(res.error);
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
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
      <Heading title="Login in for E~shop" />
      <Button
        label="Continue with Google"
        onClick={() => {
          signIn("google");
        }}
        outline
        icon={AiOutlineGoogle}
      />
      <hr className="w-full h-px bg-slate-300" />

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
        label={`${isLoading ? "Loading..." : "Login in"}`}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Dont have an account?{" "}
        <Link href="/register" className="underline">
          Register
        </Link>{" "}
        here.
      </p>
    </>
  );
}
