"use client";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import Link from "next/link";
import { CartProductType } from "../product/[productId]/ProductDetails";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
  item: CartProductType;
}

export default function ItemContent({ item }: ItemContentProps) {
  const {
    handleRemoveProductFromCart,
    handleQuantityIncrease,
    handleQuantityDecrease,
  } = useCart();
  return (
    <div className="grid items-center grid-cols-5 gap-4 py-2 mt-8 text-xs border-t-[1.5px] border-slate-200 overflow-x-auto">
      <div className="flex items-center col-span-2 gap-2 justify-self-start md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="w-[70px] aspect-square ">
            <Image
              src={item.selectedImg.image}
              alt={item.selectedImg.color}
              className="object-contain"
              width={70}
              height={70}
            />
          </div>
        </Link>
        <div className="space-y-2">
          <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="w-[70px]">
            <button
              onClick={() => handleRemoveProductFromCart(item)}
              className="underline text-slate-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-start">{formatPrice(item.price)}</div>
      <div className="justify-self-start">
        <SetQuantity
          handleQuantityDecrease={() => {
            handleQuantityDecrease(item);
          }}
          handleQuantityIncrease={() => {
            handleQuantityIncrease(item);
          }}
          cartProduct={item}
          cartCounter={true}
        />
      </div>
      <div className="font-semibold justify-self-end">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
}
