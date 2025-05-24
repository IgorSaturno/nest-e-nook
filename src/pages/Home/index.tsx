import { Link } from "react-router-dom";
import imageHero from "../../assets/hero-desktop.png";
import imageHeroMobile from "../../assets/hero-mobile.png";
import { products } from "../../data/products";
import { ProductCard } from "../ProductPage/components/ProductCard";

export function Home() {
  return (
    <div>
      <section className="mx-auto">
        <Link to="/">
          <img
            src={imageHero}
            alt="Cadeira Linha Ares"
            className="lg:block hidden"
          />
          <img
            src={imageHeroMobile}
            alt="Cadeira Linha Ares"
            className="lg:hidden block"
          />
        </Link>
      </section>
      <section>
        <h1 className="lg:text-2xl  text-center pt-6  font-semibold tracking-tight text-gray-700 underline">
          Destaques
        </h1>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              variant={prod.variants[0]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
