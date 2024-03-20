"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Button from "../Button";
import Heading from "../Heading";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";

export default function CartClient() {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div>
        <div className="flex flex-col items-center">
          <p className="text-2xl">Your cart is empty.</p>
          <div>
            <Link
              href="/cart"
              className="flex items-center gap-1 mt-2 text-slate-500"
            >
              <MdArrowBack className="" />
              <span>Start shopping.</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="grid items-center grid-cols-5 gap-4 pb-2 mt-8 text-xs">
        <div className="col-span-2 justify-self-start">Product</div>
        <div className="justify-self-start">Price</div>
        <div className="justify-self-start">Quantity</div>
        <div className="justify-self-end">Total</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => <ItemContent key={item.id} item={item} />)}
      </div>
      <div className="flex justify-between gap-4 py-4 border-t-[1.5px] border-slate-200">
        <div className="w-[90px]">
          <Button
            label="Clear Cart"
            small
            outline
            onClick={() => {
              handleClearCart();
            }}
          />
        </div>
        <div className="flex flex-col items-start gap-1 text-sm">
          <div className="flex flex-col items-center gap-1">
            <div className="flex justify-between w-full text-base font-semibold">
              <span>Sub total</span>
              <span>{formatPrice(cartTotalAmount)}</span>
            </div>
            <p className="text-slate-500">
              Taxes and shipping calculate at checkout.
            </p>
            <Button label="Checkout" custom="text-sm" onClick={() => {}} />
            <Link
              href="/cart"
              className="flex items-center gap-1 mt-2 text-slate-500"
            >
              <MdArrowBack className="" />
              <span>Continue shopping.</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
