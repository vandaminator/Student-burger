import Link from "next/link";

function ConfirmPage() {
  return (
    <main className="mx-auto flex flex-col gap-3">
      <h1 className="text-2xl font-semibold text-primary underline">
        Order has been confirmed
      </h1>
      <p className="">We will contact you in a few moments.</p>
      <p>
        Our numbers are{" "}
        <a href="tel:+26658539540" className="text-accent underline">
          +266 5853 9540
        </a>
      </p>

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
