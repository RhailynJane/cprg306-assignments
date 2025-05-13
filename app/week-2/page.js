import Link from "next/link";
import StudentInfo from "./_student-info";

export default function Page() {
  return (
    <main>
      <Link href="./" className="text-cyan-700">
        Home
      </Link>
      <br />
      <br />

      <h1>Shopping List</h1>
      <StudentInfo />
    </main>
  );
}
