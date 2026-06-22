function SearchBar({ query, onSearch }) {
  return (
    <div className="flex justify-center my-6 px-4">
      <div className="flex w-full max-w-xl">
        <input
          type="text"
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Cari makanan favoritmu..."
          className="flex-1 border-2 border-blue-400 rounded-l-lg px-4 py-2 outline-none focus:border-blue-600"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
          🔍
        </button>
      </div>
    </div>
  );
}

export default SearchBar;