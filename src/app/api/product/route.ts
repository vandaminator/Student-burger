import { Product, fetchProduct } from "@/types";
import { CMSSupaProduct } from "@/util/supabase";
import { createClient } from "@/util/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabase = createClient();

  let { data: Products, error } = await supabase.from("Products").select("*");

  if (!Products || Products.length === 0) {
    return new NextResponse("No products", { status: 500 });
  }

  const info: Product[] = CMSSupaProduct(Products)

  const data: fetchProduct = {result: info}
  return NextResponse.json(data);
};
