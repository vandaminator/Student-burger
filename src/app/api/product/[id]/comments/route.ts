import { createClient } from "@/util/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (
  _req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const supabase = createClient();

    let { data: Comments, error } = await supabase
      .from("Comments")
      .select("*, Users(firstName, lastName)")
      .eq("product", +params.id);

    if (error) {
      throw Error(`Error: api/product/${params.id}/comments`, { cause: error });
    }

    return NextResponse.json({ comments: Comments ?? [] });
  } catch (error) {
    console.error(error);
    return new NextResponse("There was an error", { status: 500 });
  }
};
