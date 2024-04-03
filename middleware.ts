export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin",
    "/admin/add-products",
    "/admin/manage-products",
    "/admin/manage-orders",
  ],
};
