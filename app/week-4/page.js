import NewItem from "./new-item.js";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Link href="./" className="text-cyan-700">
        Home
      </Link>
      <NewItem />
    </>
  );
}
