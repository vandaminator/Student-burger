import { fetchProduct } from "@/types";
import { CMSSupaProduct } from "@/util/supabase";
import { createClient } from "@/util/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabase = createClient();

  let { data: Best, error } = await supabase.from("Best").select("*, Products(*)");

  const load = Best || []
  let Products = (Best ?? []).map((b) => b.Products).filter((p) => p)

  //@ts-ignore
  const info = CMSSupaProduct(Products)

  const data: fetchProduct = {result: info}
  return NextResponse.json(data);
};
