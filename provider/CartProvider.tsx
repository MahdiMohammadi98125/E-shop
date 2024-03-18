"use client";
import { CartContextProvider } from "@/hooks/useCart";
import React from "react";

interface CartProviderProps {
  children: React.ReactNode;
}
export const CartProvider = ({ children }: CartProviderProps) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};
