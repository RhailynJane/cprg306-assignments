import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl text-center">
        CPRG 306: Web Development 2 - Assignments
      </h1>

      <br />
      <h2 className="text-center text-2xl">Assignment Links</h2>
      <ul>
        <li>
          <Link href="./week-2/" className="hover:text-cyan-600">
            Week 2 Assignment
          </Link>
        </li>
        <li>
          <Link href="./week-3/" className="hover:text-cyan-600">
            Week 3 Assignment
          </Link>
        </li>
      </ul>
    </main>
  );
}
