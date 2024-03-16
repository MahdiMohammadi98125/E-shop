import { products } from "@/utils/products";
import Container from "./Container";
import HomeBanner from "./HomeBanner";
import { truncateText } from "@/utils/truncateText";
export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {products.map((product) => (
            <div key={product.id}>
              <h1>{truncateText(product.name)}</h1>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
