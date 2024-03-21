import React from "react";
import ProductDetails from "./ProductDetails";
import { products } from "@/utils/products";
import Container from "@/app/components/Container";
import ListRating from "./ListRating";
interface IParams {
  productId?: string;
}
export default function ProductPage({ params }: { params: IParams }) {
  const product = products.find((product) => product.id === params?.productId);
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col gap-4 mt-20">
          <div>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
}
