import { fetchIdProduct } from "@/types";
import { CMSSupaIdProduct } from "@/util/supabase";
import { createClient } from "@/util/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (
  _req: Request,
  { params }: { params: { id: string } },
) => {
  const supabase = createClient();

  let { data: Products, error } = await supabase
    .from("Products")
    .select("*")
    .eq("id", +params.id);

  let { data: product_rating, error: rate_error } = await supabase
    .from("product_rating")
    .select("*")
    .eq("product", +params.id);

  const rating =
    product_rating !== null && product_rating.length !== 0
      ? product_rating[0].average_rating
      : null;

  const info = CMSSupaIdProduct(Products ?? []);
  const data: fetchIdProduct = { result: info, rating };
  return NextResponse.json(data);
};
