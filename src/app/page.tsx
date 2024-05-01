"use client";
import ProductGrid from "@/components/Products/ProductGrid";
import HomeCarousel from "./HomeCarousel";
import { useEffect, useState } from "react";

export type Product = {
  title: string;
  image: string;
  id: string;
  price: number;
};

async function getProducts() {
  const domian = window.location.origin
  const bestResponse = await fetch(domian + "/api/best", { cache: "no-store" });
  const productResponse = await fetch(domian + "/api/product", { cache: "no-store" });

  const [bestInfo, productInfo] = await Promise.all([
    bestResponse,
    productResponse,
  ]);
  const [bestData, productData]: { result: Product[] }[] = await Promise.all([
    bestInfo.json(),
    productInfo.json(),
  ]);

  return { bestData, productData };
}

function Home() {
  const [isLoading, setLoading] = useState(true);
  const [bestData, setBest] = useState<{ result: Product[] }>();
  const [productData, setProduct] = useState<{ result: Product[] }>();

  useEffect(() => {
    const load = async () => {
      const { bestData, productData } = await getProducts();
      setBest(bestData);
      setProduct(productData);
      setLoading(false);
    };
    load()
  }, []);

  return (
    <main className="flex w-full flex-col gap-3">
      {isLoading && <>Loading ...</>}
      {bestData! && productData! && (
        <>
          <HomeCarousel featuredItems={bestData.result} />
          <ProductGrid items={productData.result} />
        </>
      )}
    </main>
  );
}

export default Home;
