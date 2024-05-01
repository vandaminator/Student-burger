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

  const info = CMSSupaIdProduct(Products ?? []);
  const data: fetchIdProduct = { result: info };
  return NextResponse.json(data);
};
