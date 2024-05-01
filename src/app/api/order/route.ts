import { Order } from "@/types";
import { supabaseClient } from "@/util/supabase";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { cart, phoneNumbers, price }: Partial<Order> = await req.json();

    if (cart === undefined)
      return new NextResponse("Cart is not defined", { status: 401 });
    if (price === undefined)
      return new NextResponse("price is not defined", { status: 401 });
    if (phoneNumbers === undefined)
      return new NextResponse("phoneNumbers is not defined", { status: 401 });

    const response = await supabaseClient.createOrder({
      products: cart,
      price,
      user: +phoneNumbers,
    });

    if (response === null) {
      throw Error("Creating order was not successfull");
    }

    return new NextResponse("The order has been made")
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
};
