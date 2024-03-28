"use client";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryProps {
  category: string;
  icon: IconType;
  selected?: boolean;
}

export default function Category({
  category,
  icon: Icon,
  selected,
}: CategoryProps) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (category === "All") {
      router.push("/");
    } else {
      let currentQuery = {};
      if (params) {
        currentQuery = queryString.parse(params.toString());
      }
      const updatedQuery: any = {
        ...currentQuery,
        category,
      };
      const url = queryString.stringifyUrl(
        { url: "/", query: updatedQuery },
        { skipNull: true }
      );
      router.push(url);
    }
  }, [category, params, router]);
  return (
    <div
      className={`flex items-center gap-1 p-2 text-center border-b-2 hover:text-slate-800 transition cursor-pointer ${
        selected
          ? "border-b-slate-800 text-slate-800"
          : "border-transparent text-slate-500"
      }`}
      onClick={handleClick}
    >
      <Icon size={20} />
      <div className="text-sm font-medium">{category}</div>
    </div>
  );
}
