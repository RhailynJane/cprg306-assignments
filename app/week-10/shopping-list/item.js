export default function Item({ name, quantity, category, onSelect, onDelete }) {
  return (
    <div className="flex justify-between items-center cursor-pointer rounded-lg shadow p-4 mb-2 bg-blue-300 w-full max-w-md mx-auto border border-black hover:bg-blue-400 transition duration-200">
      <div onClick={() => onSelect && onSelect({ name, quantity, category })}>
        <h1 className="text-black text-2xl font-semibold">{name}</h1>
        <p className="text-gray-600">
          Buy {quantity} in {category}
        </p>
      </div>
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering onSelect
            onDelete();
          }}
          className="ml-4 px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
        >
          Delete
        </button>
      )}
    </div>
  );
}
