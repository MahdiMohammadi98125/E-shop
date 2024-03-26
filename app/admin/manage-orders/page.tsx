import { getCurrentUser } from "@/actions/getCurrentUser";
import { getOrders } from "@/actions/getOrders";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import ManageOrderClients from "./ManageOrderClients";

export default async function ManageOrders() {
  const orders = await getOrders();

  // protecting the manage order page
  const currentUser = await getCurrentUser();
  const admin = currentUser?.role === "ADMIN";
  if (!currentUser || !admin) {
    return <NullData title="Oops! Access Denied!" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <ManageOrderClients orders={orders} />
      </Container>
    </div>
  );
}
