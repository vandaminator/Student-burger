import bcrypt from "bcrypt";
import { createClient } from "@/util/supabase/server";
import { NextResponse } from "next/server";

type Sent = Partial<{
  firstName: string;
  lastName: string;
  password: number;
  phoneNumber: number;
}>;

export const POST = async (req: Request) => {
  try {
    const { firstName, lastName, password, phoneNumber }: Sent =
      await req.json();

    // Check for phone number
    if (phoneNumber === undefined)
      return new NextResponse("phoneNumber value is missing", { status: 401 });

    if (firstName === undefined) {
      return new NextResponse("First Name value is missing", { status: 401 });
    }

    if (lastName === undefined) {
      return new NextResponse("Last Name value is missing", { status: 401 });
    }

    if (password === undefined) {
      return new NextResponse("Password value is missing", { status: 401 });
    }

    const supabase = createClient();

    const hashedPassword = await bcrypt.hash(password.toString(), 2);

    const { data, error } = await supabase
      .from("Users")
      .insert([{ firstName, lastName, phoneNumber, password: hashedPassword }])
      .select();

    console.log(data, error)

    if (data !== null) {
      return new NextResponse("successfull");
    } else throw new Error("There was an error in creating the user");
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
};
