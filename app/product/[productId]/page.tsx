import { getCurrentUser } from "@/actions/getCurrentUser";
import { getProductById } from "@/actions/getProductById";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import ListRating from "./ListRating";
import ProductDetails from "./ProductDetails";
interface IParams {
  productId?: string;
}
export default async function ProductPage({ params }: { params: IParams }) {
  const product = await getProductById(params);
  const user = await getCurrentUser();
  if (!product) {
    return (
      <NullData title="Oops! product with the given Id does  not found!" />
    );
  }
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col gap-4 mt-20">
          <AddRating product={product} user={user} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
}
