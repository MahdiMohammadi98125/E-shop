export const formatPrice = (price: number) =>
  Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    price
  );
