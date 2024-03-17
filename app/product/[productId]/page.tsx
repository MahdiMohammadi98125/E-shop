import React from "react";
interface IParams {
  productId?: string;
}
export default function ProductPage({ params }: { params: IParams }) {
  return <div>ProductPage {params.productId}</div>;
}
