"use client";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function SearchBar() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!data.searchTerm) return router.push("/");
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: { searchTerm: data.searchTerm },
      },
      { skipNull: true }
    );
    router.push(url);
    reset();
  };
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Explore E-shop"
        {...register("searchTerm")}
        className="p-2 border-slate-300 border rounded-l-md focus:outline-none focus:border-slate-500 focus:border-[0.5px] w-80"
      />
      <button
        className="p-2 text-white transition rounded-r-md bg-slate-700 hover:bg-opacity-80"
        onClick={handleSubmit(onSubmit)}
      >
        Search
      </button>
    </div>
  );
}
