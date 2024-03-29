import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/app/components/Container";
import { Redressed } from "next/font/google";
import Link from "next/link";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import SearchBar from "./SearchBar";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

export default async function NavBar() {
  const currentUser = await getCurrentUser();
  return (
    <nav className="sticky top-0 z-30 w-full shadow-sm bg-slate-200 ">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href="/"
              className={`text-2xl font-bold ${redressed.className}`}
            >
              E-Shop
            </Link>
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <Categories />
    </nav>
  );
}
