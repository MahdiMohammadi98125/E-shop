import { IProductParams, getProducts } from "@/actions/getProducts";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import NullData from "./components/NullData";
import ProductCard from "./components/products/ProductCard";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);
  if (products.length === 0) {
    return (
      <NullData title="Oops! no products found. please click All to clear the filter" />
    );
  }

  // shuffle algorithem
  function shuffleArray(arr: any[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i * 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const suffleProducts = shuffleArray(products);
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {suffleProducts.map((product) => (
            <div key={product.id}>
              <ProductCard data={product} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
