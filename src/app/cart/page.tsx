"use client";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "@/context/cart";
import { Button, Divider } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { Order, fetchQuantities } from "@/types";
import Item from "./components/Item";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import HamsterLoader from "@/components/HamsterLoader";

function CartPage() {
  const {
    cart,
    removeItemCart,
    changeItemQty,
    changeItemsAvaliable,
    removeAllItems,
  } = useContext(cartContext);
  const [price, setPrice] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [dataNotLoaded, setDataNotLoaded] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (cart.length > 0) {
      const newPrice = cart.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.quantity,
        0,
      );
      setPrice(newPrice);

      if (dataNotLoaded) {
        const load = async () => {
          const ids = cart.map((item) => item.id);
          const response = await fetch("/api/product/quantity", {
            method: "PUT",
            body: JSON.stringify(ids),
          });
          const data: fetchQuantities[] = await response.json();
          changeItemsAvaliable(data);
          setDataNotLoaded(false);
          setPageLoading(false);
        };
        load();
      }
    }
  }, [cart, changeItemsAvaliable, dataNotLoaded]);

  const handleBuy = () => {
    if (status === "authenticated") {
      const loading = async () => {
        const phoneNumbers = data.user?.email as string;
        const order: Order = {
          cart,
          phoneNumbers,
          price,
        };

        const response = await fetch("/api/order", {
          method: "POST",
          body: JSON.stringify(order),
        });

        if (response.ok) {
          toast.success("Order has been made");
          removeAllItems();
          router.push("/cart/confirm");
        } else {
          toast.error("Something went wrong");
        }

        setLoading(false);
      };
      setLoading(true);
      loading();
    } else {
      signIn("credentials");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-primary">Cart</h1>
      <Divider className="my-4" />
      {pageLoading ? (
        <HamsterLoader />
      ) : (
        <>
          {cart.length <= 0 && <>No items in cart</>}
          {cart.length > 0 && (
            <>
              <div className="flex flex-col gap-3">
                {cart.map((item) => (
                  <Item
                    key={item.id}
                    order={item}
                    removeItemCart={() => removeItemCart(item.id)}
                    changeQty={(qty) => changeItemQty(item.id, qty)}
                  />
                ))}
              </div>
              <Divider className="my-4" />
              <div className="flex flex-col items-end gap-3">
                <p className="text-xl font-semibold text-primary">
                  Price: R {price.toFixed(2)}
                </p>
                <div className="flex gap-3">
                  <Button color="danger" variant="ghost">
                    Cancel
                  </Button>
                  <Button
                    color="success"
                    variant="shadow"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    onClick={(e) => handleBuy()}
                  >
                    Buy
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default CartPage;
