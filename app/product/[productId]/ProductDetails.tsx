"use client";
import Button from "@/app/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SelectedColor from "@/app/components/products/SelectedColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { averageProductRating } from "@/utils/averageProductRating";
import { Rating } from "@mui/material";
import { useCallback, useState } from "react";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};
export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizental = () => {
  return <hr className="w-[30%] my-2 " />;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { cartProducts, handleAddProductToCart } = useCart();
  console.log(cartProducts);
  const [cartProduct, setCartProduct] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] }, //default to the
    quantity: 1,
    price: product.price,
  });
  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => ({ ...prev, selectedImg: value }));
  }, []);

  const handleQuantityIncrease = useCallback(() => {
    if (cartProduct.quantity === 90) return;
    setCartProduct((prev) => ({ ...prev, quantity: prev.quantity++ }));
  }, [cartProduct]);

  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;
    setCartProduct((prev) => ({ ...prev, quantity: --prev.quantity }));
  }, [cartProduct]);

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleSelectedImg={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-sm text-slate-500">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={averageProductRating(product)} />
          <div className="space-x-2">
            <span>{product.reviews.length}</span>
            <span>reviews</span>
          </div>
        </div>
        <Horizental />
        <p>{product.description}</p>
        <Horizental />
        <div>
          <span className="font-semibold">CATEGORY:</span>
          <span>{product.category}</span>
        </div>

        <div>
          <span className="font-semibold">BRAND:</span>
          <span>{product.brand}</span>
        </div>

        <div
          className={`${product.inStock ? "text-teal-400" : "text-rose-400"}`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>

        <Horizental />

        <SelectedColor
          cartProduct={cartProduct}
          images={product.images}
          handleColorSelect={handleColorSelect}
        />

        <Horizental />
        <SetQuantity
          cartProduct={cartProduct}
          handleQuantityIncrease={handleQuantityIncrease}
          handleQuantityDecrease={handleQuantityDecrease}
        />
        <Horizental />
        <div className="w-full md:w-[300px]">
          <Button
            label="Add to cart"
            onClick={() => handleAddProductToCart(cartProduct)}
          />
        </div>
      </div>
    </div>
  );
}
