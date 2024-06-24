import { fetchProduct } from "@/types";
import { CMSSupaProduct } from "@/util/supabase";
import { createClient } from "@/util/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = req.nextUrl;
    const supabase = createClient();
    const query = url.searchParams.get("query");

    const page = +(url.searchParams.get("page") ?? "1");
    console.log(url.search)
    const start = page * 10 - 10;
    const end = start + 9;

    const method = async (query: string | null) => {
      if (query && query.trim() !== "") {
        let search = await supabase
          .from("Products")
          .select("*")
          .textSearch("name", query.trim())
          .range(start, end);
        return search;
      } else {
        let search = await supabase
          .from("Products")
          .select("*")
          .range(start, end);
        return search;
      }
    };

    let { data: Product, error } = await method(query);
    if (error) console.error(error);

    const info = CMSSupaProduct(Product ?? []);

    const data: fetchProduct = { result: info };
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Something wrong happend.", { status: 500 });
  }
};
