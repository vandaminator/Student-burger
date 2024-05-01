import { Product } from "@/types";

export type CartStorage = {
  cartItems: Product[];
};

export const addToCart = (product: Product) => {
  const cartItems = localStorage.getItem("cart");
  if (cartItems) {
    const cart = JSON.parse(cartItems) as CartStorage;
    const newCart =
      cart.cartItems.length === 0 ? [product] : [...cart.cartItems, product];
    cart.cartItems = newCart;

    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    const initail: CartStorage = { cartItems: [product] };
    localStorage.setItem("cart", JSON.stringify(initail));
  }
};

export const getCart = () => {
  const cartItems = localStorage.getItem("cart");
  if (cartItems) {
    const items = JSON.parse(cartItems) as CartStorage;
    return items;
  } else return "No Items";
};

export const removeItemCart = (id: string) => {
  const cartItems = localStorage.getItem("cart");
  if (cartItems) {
    const cart = JSON.parse(cartItems) as CartStorage;
    const cartStuff = cart.cartItems.filter((value) => value.id !== id);
    cart.cartItems = cartStuff;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const changeItemQty = (id: string, quantity: number) => {
  const cartItems = localStorage.getItem("cart");
  if (cartItems) {
    const cart = JSON.parse(cartItems) as CartStorage;
    const cartItemIndex = cart.cartItems.findIndex((value) => value.id === id);
    if (cartItemIndex !== -1) cart.cartItems[cartItemIndex].quantity = quantity;
    // cart.cartItems = cartStuff
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const changeItemsAvaliable = (
  changes: { id: string; quantity: number }[],
) => {
  const cartItems = localStorage.getItem("cart");
  if (cartItems) {
    const cart = JSON.parse(cartItems) as CartStorage;
    changes.forEach(({id, quantity}) => {
      const foundIndex = cart.cartItems.findIndex(item => id === item.id)
      if (foundIndex !== -1) {
        cart.cartItems[foundIndex].avaliableQty = quantity
      }
    })
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeAllItems = () => {
  const cartItems = localStorage.getItem("cart");
  if (cartItems) {
    const cart = JSON.parse(cartItems) as CartStorage;
    cart.cartItems = []
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};
