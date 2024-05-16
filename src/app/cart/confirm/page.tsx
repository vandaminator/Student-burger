import Link from "next/link";

function ConfirmPage() {
  return (
    <main className="mx-auto flex flex-col gap-3">
      <h1 className="text-2xl font-semibold text-primary underline">
        Order confirmed
      </h1>
      <p>
        You will get a message from this WhatsApp number:{" "}
        <a className="underline" href="tel:+26658967429">+266 5896 7429</a> /{" "}
        <a className="underline" href="tel:+26662510192">+266 62510192</a> Notifying you when to
        collect your finished order
      </p>
      <Link
        className="mx-auto mt-7 flex w-full justify-center rounded bg-gradient-to-r from-primary to-accent p-3 font-semibold text-white"
        href={"/"}
      >
        Continue shopping
      </Link>
    </main>
  );
}

export default ConfirmPage;
