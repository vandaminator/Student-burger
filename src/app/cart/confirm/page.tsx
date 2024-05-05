import Link from "next/link";

function ConfirmPage() {
  return (
    <main className="mx-auto flex flex-col gap-3">
      <h1 className="text-2xl font-semibold text-primary underline">
        Order has been confirmed
      </h1>
      <Link
        className="mx-auto mt-7 w-full bg-gradient-to-r from-primary to-accent flex justify-center p-3 rounded text-white font-semibold"
        href={"/"}
      >
        Continue shopping
      </Link>
    </main>
  );
}

export default ConfirmPage;
