import { Avatar, Button } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { Session } from "next-auth";

type Props = {
  data: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
};

function User({ data, status }: Props) {
  return (
    <>
      {["loading", "unauthenticated"].includes(status) && (
        <Avatar fallback={<FaUser color="primary" />} />
      )}
      {status === "authenticated" && (
        <Avatar
          src={data?.user?.image || ""}
          fallback={<FaUser color="primary" />}
        />
      )}
    </>
  );
}

export default User;
