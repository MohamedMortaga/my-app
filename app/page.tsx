import MainSlider from "./components/home/MainSlider";
import CategoriesSection from "./components/home/CategoriesSection";
import ProductsSection from "./components/home/ProductsSection";
import { Suspense } from "react";
import CatSkelton from './components/shared/CatSkelton';
import ProdSkelton from './components/shared/ProdSkelton';
export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store'; 

export default function Home() {
  return (
    <>
    <MainSlider />
    <Suspense fallback={<CatSkelton/>}>
      <CategoriesSection />
    </Suspense>
    <Suspense fallback={<ProdSkelton/>}>
      <ProductsSection />
    </Suspense>
    </>
  );
}
