"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { Product } from "@/types";
import {
  getCart,
  addToCart as add,
  removeItemCart as remove,
  changeItemQty as change,
  changeItemsAvaliable as changeAvaliable,
  removeAllItems as removeAll
} from "@/util/Cart";
import toast from "react-hot-toast";

const cart: Product[] = [];
const setCart: Dispatch<SetStateAction<Product[]>> = () => {};
const addToCart = (product: Product) => {};
const removeItemCart = (id: string) => {};
const changeItemQty = (id: string, quantity: number) => {};
const removeAllItems = () => {}
const changeItemsAvaliable = (
  changes: {
    id: string;
    quantity: number;
  }[],
) => {};

const initial = {
  cart,
  setCart,
  addToCart,
  removeItemCart,
  changeItemQty,
  changeItemsAvaliable,
  removeAllItems
};

export const cartContext = createContext(initial);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const refreshCart = () => {
    const cartStorage = getCart();
    const loadedCart = cartStorage !== "No Items" ? cartStorage.cartItems : [];
    setCart(loadedCart);
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = (product: Product) => {
    const found = cart.find((p) => p.id === product.id);

    if (found) {
      toast((t) => <span>Product is already in cart</span>);
      return;
    }

    add(product);
    refreshCart();

    toast.success("Added to Cart");
  };

  const removeItemCart = (id: string) => {
    remove(id);
    refreshCart();
    toast.success("Item was removed");
  };

  const changeItemQty = (id: string, quantity: number) => {
    change(id, quantity);
    refreshCart();
  };

  const changeItemsAvaliable = (
    changes: {
      id: string;
      quantity: number;
    }[],
  ) => {
    changeAvaliable(changes)
    refreshCart()
  };

  const removeAllItems = () => {
    removeAll()
    refreshCart()
  }

  return (
    <cartContext.Provider
      value={{ cart, setCart, addToCart, removeItemCart, changeItemQty, changeItemsAvaliable, removeAllItems }}
    >
      {children}
    </cartContext.Provider>
  );
};
