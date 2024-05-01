"use client";

import { Product, fetchIdProduct, idProduct } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { cartContext } from "@/context/cart";
import ImageSlider from "./components/ImageSlider";
import { Button } from "@nextui-org/react";
import { FaCartPlus } from "react-icons/fa";

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<idProduct | "notFound">();
  const [isloading, setLoading] = useState(true);
  const { addToCart } = useContext(cartContext);

  useEffect(() => {
    const origin = window.location.origin;
    const load = async () => {
      const response = await fetch(origin + `/api/product/${id}`);
      const data: fetchIdProduct = await response.json();
      if (data.result.length !== 0) setData(data.result[0]);
      else setData("notFound");
      setLoading(false);
    };
    load();
  }, [id]);

  const handleBuy = () => {
    if (data! && data !== "notFound") {
      const newProduct: Product = {
        id: data.id,
        title: data.title,
        image: data.images[0],
        price: data.price,
        quantity: 1
      };
      addToCart(newProduct);
    }
  };

  return (
    <main className="flex flex-col gap-3">
      {isloading && <>Loading ...</>}
      {data! && (
        <>
          {data === "notFound" && <>Not found</>}
          {data !== "notFound" && (
            <>
              <div className="flex gap-3 max-lg:flex-col max-lg:items-center">
                <ImageSlider data={data} />

                <div className="w-1/2 max-lg:w-full lg:h-fit lg:px-2 lg:pb-[100px] lg:rounded lg:pt-2 lg:shadow-lg">
                  {/* Info  */}
                  <div className="flex w-full flex-col gap-3 rounded p-1 max-lg:shadow-lg">
                    <h1 className="text-2xl">{data.title}</h1>
                    <p className="text-3xl font-bold">
                      R {data.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Add Cart */}
                  <div className="flex w-full justify-center p-3 max-lg:fixed max-lg:bottom-0 max-lg:left-0">
                    <Button
                      className={`w-3/4 text-white max-lg:mx-auto ${
                        data.quantity > 0 ? "bg-accent" : "bg-danger"
                      }`}
                      disabled={data.quantity <= 0}
                      onClick={(_e) => handleBuy()}
                    >
                      {data.quantity > 0 ? (
                        <>
                          <FaCartPlus size={20} />
                          <p className="text-xl">Add to cart</p>
                        </>
                      ) : (
                        <p className="text-xl">Out of Stock</p>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
}

export default ProductPage;
