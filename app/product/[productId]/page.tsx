import React from "react";
import ProductDetails from "./ProductDetails";
import { productDetails } from "@/utils/productDetails";
import Container from "@/app/Container";
import ListRating from "./ListRating";
interface IParams {
  productId?: string;
}
export default function ProductPage({ params }: { params: IParams }) {
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={productDetails} />
        <div className="flex flex-col gap-4 mt-20">
          <div>Add Rating</div>
          <ListRating product={productDetails} />
        </div>
      </Container>
    </div>
  );
}
