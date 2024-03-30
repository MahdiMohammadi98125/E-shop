import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { CartProductType } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface OrderItemProps {
  item: CartProductType;
}

export default function OrderItem({ item }: OrderItemProps) {
  return (
    <div className="grid items-center grid-cols-5 gap-4 overflow-x-auto md:text-sm">
      <div className="flex items-center col-span-2 gap-2 md:gap-4 justify-self-start">
        <div className="relative w-[70px] aspect-square">
          <Image
            src={item.selectedImg.image}
            alt={item.selectedImg.color}
            fill
            className="object-contain border-b"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>{truncateText(item.name)}</div>
          <div>{item.selectedImg.color}</div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">{item.quantity}</div>
      <div className="font-semibold justify-self-end">
        {(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}
