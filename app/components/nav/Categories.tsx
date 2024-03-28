"use client";
import React from "react";
import Container from "../Container";
import { categories } from "@/utils/categories";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

export default function Categories() {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();

  const isMainPage = pathName === "/";
  if (!isMainPage) return null;

  return (
    <div className="bg-white">
      <Container>
        <div className="flex items-center justify-between gap-2 overflow-x-auto">
          {categories.map((item) => (
            <Category
              key={item.label}
              icon={item.icon}
              category={item.label}
              selected={
                category === item.label ||
                (category === null && item.label === "All")
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
