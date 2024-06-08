"use client";

import { Product, fetchComments, fetchIdProduct, idProduct } from "@/types";
import { useParams } from "next/navigation";
import {
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { cartContext } from "@/context/cart";
import ImageSlider from "./components/ImageSlider";
import { Button } from "@nextui-org/react";
import { FaCartPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Comments from "./components/Comments";
import HamsterLoader from "@/components/HamsterLoader";
import toast from "react-hot-toast";
import AddComment from "./components/AddComment";

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<idProduct | "notFound">();
  const [rating, setRating] = useState<number | string>("N/A");
  const [isloading, setLoading] = useState(true);
  const [comments, setComments] = useState<fetchComments>([]);
  const { addToCart } = useContext(cartContext);

  useEffect(() => {
    const origin = window.location.origin;
    const load = async () => {
      const response = await fetch(origin + `/api/product/${id}`);
      const data: fetchIdProduct = await response.json();
      if (data.result.length !== 0) {
        setData(data.result[0]);
        if (data.rating) setRating(data.rating);
      } else setData("notFound");
      setLoading(false);

      const commentsResponse = await fetch(
        origin + `/api/product/${id}/comments`,
      );
      if (commentsResponse.ok) {
        const commentsData: { comments: fetchComments } =
          await commentsResponse.json();
        setComments(commentsData.comments);
      }
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
        quantity: 1,
      };
      addToCart(newProduct);
    }
  };

  const handleAddComment = (
    text: string,
    rating: Set<string>,
    user: number,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => {
    console.debug(rating)
    if (text.length == 0 || rating.size == 0) {
      toast.error("Rating or Comment is missing");
    } else if (text.length > 72) {
        toast.error("Text has more than 72 chars")
    }

    const numRating = rating.values().next().value as string
    const origin = window.location.origin;
    const loading = async () => {
      setLoading(true);
      const response = await fetch(origin + `/api/product/${id}/comments`, {
        method: "POST",
        body: JSON.stringify({ message: text, rating: +numRating, user }),
      });
      if (response.ok) {
        toast.success("Comment was added");
        window.location.reload()
      } else {
        toast.error(response.statusText);
      }
      setLoading(false);
    };
    loading();
  };

  return (
    <main className="flex flex-col gap-3">
      {isloading && <HamsterLoader />}
      {data! && (
        <>
          {data === "notFound" && <>Not found</>}
          {data !== "notFound" && (
            <>
              <div className="flex gap-3 max-lg:flex-col max-lg:items-center">
                <ImageSlider data={data} />

                <div className="w-1/2 max-lg:w-full lg:h-fit lg:rounded lg:px-2 lg:pb-[100px] lg:pt-2 lg:shadow-lg">
                  {/* Info  */}
                  <div className="grid w-full grid-cols-2 gap-3 rounded p-1 max-lg:shadow-lg">
                    <h1 className="text-2xl">{data.title}</h1>

                    <p
                      className={`flex items-center gap-1 text-xl font-bold ${rating != "N/A" ? "" : "hidden"}`}
                    >
                      <span>
                        <FaStar />
                      </span>
                      {typeof rating == "number" ? rating.toFixed(1) : rating}
                    </p>

                    <p className="text-3xl font-bold">
                      R {data.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Add Cart */}
                  <div className="flex w-full justify-center p-3">
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

                {/* Comments */}
                <div className="flex w-full flex-col gap-3">
                  <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold">Comments</h2>
                    <AddComment handleAddComment={handleAddComment} />
                  </div>
                  <Comments comments={comments} />
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
