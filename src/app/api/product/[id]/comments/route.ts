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
      .eq("product", +params.id).order("created_at", {ascending: false}).limit(5);

    if (error) {
      throw Error(`Error: api/product/${params.id}/comments`, { cause: error });
    }

    return NextResponse.json({ comments: Comments ?? [] });
  } catch (error) {
    console.error(error);
    return new NextResponse("There was an error", { status: 500 });
  }
};

export const POST = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const body: Partial<{ user: number; message: string; rating: number }> =
    await req.json();
    const id = params.id;
    const supabase = createClient();

    const { user, message, rating } = body;
    if (!user || !message || !rating) {
      return new NextResponse(
        "One of the values are missing in user, message or rating",
        {
          status: 400,
          statusText:
            "One of the values are missing in user, message or rating",
        },
      );
    }

    if (
      typeof user != "number" ||
      typeof message != "string" ||
      typeof rating != "number"
    ) {
      return new NextResponse(
        "One of the values is not in the correct data type. user: number; message: string; rating: number",
        {
          status: 400,
          statusText:
            "One of the values is not in the correct data type. user: number; message: string; rating: number",
        },
      );
    }

    if (rating < 1 || rating > 5) {
      return new NextResponse("Rating must be in range 5-1", {
        status: 400,
        statusText: "Rating must be in range 5-1",
      });
    }

    let { error } = await supabase
      .from("Comments")
      .insert({ user, message, rating, product: +id });

    if (error) {
      if (error.code == "23503") {
        return new NextResponse("User or Product does not exist in database", {
          status: 400,
          statusText: "User or Product does not exist in database",
        });
      } else if (error.code == "22P02") {
        return new NextResponse("rating and user should be an Integer", {
          status: 400,
          statusText: "rating and user should be an Integer",
        });
      } else
        throw Error(
          `An error occurred in API POST /api/product/${id}/comments with ${JSON.stringify(body)}`,
          { cause: error },
        );
    }

    return new NextResponse(`The comment was created`);
  } catch (error: any) {
    console.error(error);
    return new NextResponse("There is somthing that went wrong", {
      status: 500,
      statusText: "There is somthing that went wrong",
    });
  }
};
