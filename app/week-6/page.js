import Link from "next/link";
import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <Link href="./" className="text-cyan-700">
        Home
      </Link>
      <br />
      <br />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Shopping List
      </h1>
      <ItemList />
    </main>
  );
}
