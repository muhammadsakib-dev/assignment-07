// Complete Component: Home.tsx
import Hero from "@/app/components/home/Hero";
import Increase from "@/app/components/home/products/Increase";
import Decrease from "@/app/components/home/products/Decrease";
import Products from "@/app/components/home/products/Products";

const Home = () => {
  return (
    <div className="mx-auto max-w-7xl max-sm:mx-4">
      <Hero />
      <Increase />
      <Decrease />
      <Products />
    </div>
  );
};

export default Home;
