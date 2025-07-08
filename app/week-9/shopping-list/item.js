export default function Item({ name, quantity, category, onSelect }) {
  return (
    <div
      onClick={() => onSelect && onSelect({ name, quantity, category })}
      className="cursor-pointer rounded-lg shadow p-4 mb-2 bg-blue-300 w-full max-w-md mx-auto border border-black hover:bg-blue-400 transition duration-200"
    >
      <h1 className="text-black text-2xl font-semibold">{name}</h1>
      <p className="text-gray-600">
        Buy {quantity} in {category}
      </p>
    </div>
  );
}
