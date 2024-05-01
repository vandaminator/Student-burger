import { fetchQuantities } from "@/types";
import { createClient } from "@/util/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const strIds: string[] = await req.json();
  const ids: number[] = strIds.map(i => +i)
  const supabase = createClient();
  let { data: Products, error } = await supabase.from("Products").select().in("id", ids)
  
  const info = Products ?? []
  const data: fetchQuantities[] = info.map(({id, qty}) => ({id: id.toString(), quantity: qty}))

  return NextResponse.json(data);
};
