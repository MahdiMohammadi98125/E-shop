import Container from "./Container";
import HomeBanner from "./HomeBanner";
export default function Home() {
  return (
    <div>
      <Container>
        <div className="p-8">
          <HomeBanner />
        </div>
      </Container>
    </div>
  );
}
