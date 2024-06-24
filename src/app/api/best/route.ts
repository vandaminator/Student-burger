import { fetchProduct } from "@/types";
import { CMSSupaProduct } from "@/util/supabase";
import { createClient } from "@/util/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabase = createClient();

  let { data: Products, error } = await supabase
    .from("Products")
    .select("*").is("isFeatured", true)

  let products = Products || []
  const info = CMSSupaProduct(products);

  const data: fetchProduct = { result: info };
  return NextResponse.json(data);
};
