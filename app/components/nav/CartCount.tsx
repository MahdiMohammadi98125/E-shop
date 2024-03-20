"use client";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";

export default function CartCount() {
  const router = useRouter();
  const { cartTotalQty } = useCart();
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push("/cart")}
    >
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <div className="absolute -top-[10px] -right-[10px] bg-slate-600 text-white w-6 h-6 rounded-full flex justify-center items-center text-sm">
        {cartTotalQty}
      </div>
    </div>
  );
}
