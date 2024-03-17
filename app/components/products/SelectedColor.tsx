import {
  CartProductType,
  SelectedImgType,
} from "@/app/product/[productId]/ProductDetails";
import React from "react";

interface SelectedColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}

export default function SelectedColor({
  images,
  cartProduct,
  handleColorSelect,
}: SelectedColorProps) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="font-semibold">COLORS:</span>
        <div className="flex items-center gap-1">
          {images.map((image: SelectedImgType) => (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`border-teal-300 rounded-full w-7 h-7 flex items-center justify-center  ${
                cartProduct.selectedImg.color === image.color
                  ? "border-[1.5px]"
                  : "border-0"
              }`}
            >
              <div
                className="w-5 h-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"
                style={{ background: image.colorCode }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
