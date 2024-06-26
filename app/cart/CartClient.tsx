"use client";
import { useCart } from "@/hooks/useCart";
import { SafeUser } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import Button from "../components/Button";
import Heading from "../components/Heading";
import ItemContent from "./ItemContent";

interface CartClientProps {
  currentUser: SafeUser | null;
}

export default function CartClient({ currentUser }: CartClientProps) {
  const router = useRouter();
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div>
        <div className="flex flex-col items-center">
          <p className="text-2xl">Your cart is empty.</p>
          <div>
            <Link
              href="/"
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
    <div className="overflow-x-auto">
      <Heading title="Shopping Cart" center />
      <div className="grid items-center grid-cols-5 gap-4 pb-2 mt-8 overflow-x-auto text-xs">
        <div className="col-span-2 justify-self-start">Product</div>
        <div className="justify-self-start">Price</div>
        <div className="justify-self-start">Quantity</div>
        <div className="justify-self-end">Total</div>
      </div>
      <div className="overflow-x-auto">
        {cartProducts &&
          cartProducts.map((item) => <ItemContent key={item.id} item={item} />)}
      </div>
      <div className="flex justify-between gap-4 py-4 border-t-[1.5px] border-slate-200 overflow-x-auto">
        <div className="w-[90px]">
          <Button
            label="Clear Cart"
            small
            outline
            onClick={() => {
              handleClearCart(true);
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
            <Button
              label={currentUser ? "Checkout" : "Login to checkout"}
              outline={currentUser ? false : true}
              custom="text-sm"
              onClick={() => {
                currentUser ? router.push("/checkout") : router.push("/login");
              }}
            />
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
