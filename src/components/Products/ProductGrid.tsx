import { Product } from "@/app/page";
import ProductCard from "./ProductCard";

type Props = {
  items: Product[];
};

const ProductGrid = ({ items }: Props) => {
  const products = items.map((p, num) => <ProductCard item={p} key={num} />);
  return <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">{products}</div>;
};

export default ProductGrid;
