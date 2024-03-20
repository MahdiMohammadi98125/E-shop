import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import React from "react";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

const buttonStyles = "border-[1.2px] border-slate-300 px-2  rounded";

export default function SetQuantity({
  cartCounter,
  cartProduct,
  handleQuantityIncrease,
  handleQuantityDecrease,
}: SetQuantityProps) {
  return (
    <div className="flex items-center gap-8">
      {cartCounter ? null : <div className="font-semibold">Quantity:</div>}
      <div className="flex items-center gap-4 text-sm">
        <button onClick={handleQuantityDecrease} className={buttonStyles}>
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button onClick={handleQuantityIncrease} className={buttonStyles}>
          +
        </button>
      </div>
    </div>
  );
}
