export default function Item({ name, quantity, category }) {
  return (
    <div className="rounded-lg shadow p-4 mb-2 bg-blue-300 w-full max-w-md mx-auto border border-black">
      <h1 className="text-black text-2xl font-semibold">{name}</h1>
      <p className="text-gray-600">
        Buy {quantity} in {category}
      </p>
    </div>
  );
}
