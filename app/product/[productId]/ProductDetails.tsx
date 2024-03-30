"use client";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SelectedColor from "@/app/components/products/SelectedColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { averageProductRating } from "@/utils/averageProductRating";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

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
  const [isProductInCart, setIsProductInCart] = useState(false);
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

  const router = useRouter();

  // to check if the product is exits in the cartProducts
  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, product.id]);

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => ({ ...prev, selectedImg: value }));
  }, []);

  const handleQuantityIncrease = useCallback(() => {
    if (cartProduct.quantity === 90) return;
    setCartProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  }, [cartProduct]);

  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;
    setCartProduct((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
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
        {isProductInCart ? (
          <>
            <p className="flex items-center gap-1 mb-2 text-slate-500">
              <span>
                <MdCheckCircle size={20} className="text-teal-400" />
              </span>
              <span>Product added to the cart</span>
            </p>
            <Button
              label="Go to cart"
              outline
              custom="w-full md:w-[300px]"
              onClick={() => router.push("/cart")}
            />
          </>
        ) : (
          <>
            <SelectedColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />

            <Horizental />
            <SetQuantity
              cartProduct={cartProduct}
              handleQuantityDecrease={handleQuantityDecrease}
              handleQuantityIncrease={handleQuantityIncrease}
            />
            <Horizental />
            <div className="w-full md:w-[300px]">
              <Button
                label="Add to cart"
                onClick={() => handleAddProductToCart(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
