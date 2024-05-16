import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import User from "./User";
import Link from "next/link";


function Customer() {
  const { data, status } = useSession();
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <button>
          <User data={data} status={status} />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        {["loading", "unauthenticated"].includes(status) && (
          <div className="grid w-[100px] grid-cols-1 gap-3 text-xl text-primary">
            <button onClick={() => signIn()}>Login</button>
            <Link href={"/sign-in"}>Sign in</Link>
          </div>
        )}
        {status === "authenticated" && (
          <div className="grid grid-cols-1 gap-3 text-primary">
            <button onClick={() => signOut()}>Sign out</button>
            <Link href={"/help"}>help</Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Customer;
