import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabaseClient } from "@/util/supabase";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        phone_number: { label: "Phone number", type: "number" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const phone_number = credentials?.phone_number;
        const password = credentials?.password;

        if (phone_number === undefined || password === undefined) return null;

        const user = await supabaseClient.logIn({ phoneNumber: phone_number });
        if (user === null) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          // Any object returned will be saved in `user` property of the JWT
          const { id, firstName, phoneNumber } = user;
          const person = {
            id: id.toString(),
            name: firstName,
            email: phoneNumber.toString(),
          };
          return person;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
