import { fetchProduct } from "@/types";
import { CMSSupaProduct } from "@/util/supabase";
import { createClient } from "@/util/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = req.nextUrl;
    let productUrl = "";
    const supabase = createClient();
    const query = url.searchParams.get("query");

    const method = async (query: string | null) => {
      if (query && query.trim() !== "") {
        let search = await supabase
          .from("Products")
          .select("*")
          .textSearch("name", query.trim());
        return search;
      } else {
        let search = await supabase.from("Products").select("*");
        return search
      }
    };

    let { data: Product, error } = await method(query);
    console.log("🚀 ~ GET ~ Product:", Product);
    if (error) console.log(error);

    const info = CMSSupaProduct(Product ?? []);

    const data: fetchProduct = { result: info };
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Something wrong happend.", { status: 500 });
  }
};
