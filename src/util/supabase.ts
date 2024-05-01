import { signInResponse } from "@/types/signin";
import { loginResponse } from "@/types/login";
import bcrypt from "bcrypt";
import { Product, fetchQuantities, idProduct } from "@/types";
import { cmsClient } from "./Content";
import { createClient } from "./supabase/server";

class Supabase {
  private url: string;
  private key: string;

  constructor(url: string, key: string) {
    this.url = url;
    this.key = key;
  }

  async signUp({
    phoneNumber,
    password,
    lastName,
    firstName,
  }: {
    phoneNumber: number;
    password: number;
    firstName: string;
    lastName: string;
  }) {
    try {
      const url = this.url + "/rest/v1/Users";
      const hashedPassword = await bcrypt.hash(password.toString(), 2);
      const body = `{\"firstName\":\"${firstName}\",\"lastName\":\"${lastName}\",\"phoneNumber\":${phoneNumber},\"password\":"${hashedPassword}"}`;
      const myHeaders = new Headers();
      console.log("🚀 ~ Supabase ~ body:", body);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("apikey", this.key);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      const response = await fetch(url, requestOptions);
      const data: signInResponse = await response.json();
      console.log(data);

      if (response.ok) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async logIn({ phoneNumber }: { phoneNumber: string }) {
    const url = this.url + `/rest/v1/Users?phoneNumber=eq.${phoneNumber}`;
    const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", this.key);

    const requestOptions = {
      headers: myHeaders,
    };

    const response = await fetch(url, requestOptions);
    const data: loginResponse[] = await response.json();

    if (response.ok) {
      return data[0];
    } else {
      return null;
    }
  }

  async createOrder(order: {
    products: Product[];
    price: number;
    user: number;
  }): Promise<"successful" | null> {
    const { user, price, products } = order;
    const supabase = createClient();

    // Create order
    const { data, error } = await supabase
      .from("Orders")
      .insert([{ price, products, user }])
      .select();

    if (error) {
      console.log(error);
      return null;
    }

    const handle = async ({ id, avaliableQty, quantity }: Product) => {
      const avQty = avaliableQty as number
      const { data, error } = await supabase
        .from("Products")
        .update({ qty: avQty - quantity })
        .eq("id", +id)
        .select();


  if (error) console.log(error)
    }
    for (let p of products) {
      await handle(p)

    }

    return "successful";
  }

  async getProduct() {
    const url = this.url;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Takes the info from supabase and makes it into the way the system understands
 * @param Product
 * @returns
 */
export function CMSSupaProduct(
  Product: {
    created_at: string;
    id: number;
    img: string[];
    name: string;
    price: number;
    qty: number;
  }[],
): Product[] {
  return Product.map(({ id, price, qty, img, name }) => ({
    id: id.toString(),
    image: img[0],
    price,
    title: name,
    quantity: qty,
  }));
}

/**
 * Takes the info from supabase and makes it into the way the system understands
 * @param idProduct
 * @returns
 */
export function CMSSupaIdProduct(
  Product: {
    created_at: string;
    id: number;
    img: string[];
    name: string;
    price: number;
    qty: number;
  }[],
): idProduct[] {
  return Product.map(({ id, price, qty, img, name }) => ({
    id: id.toString(),
    images: img,
    price,
    title: name,
    quantity: qty,
  }));
}

export const supabaseClient = new Supabase(url, key);

export default Supabase;
