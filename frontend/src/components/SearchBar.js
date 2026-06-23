function SearchBar({ searchQuery, setSearchQuery }) {

  return (
    <div className="max-w-2xl mx-auto px-3 md:px-4 mb-6 md:mb-8">
      <input
        type="text"
        placeholder="🔍 Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-gray-800 text-white text-base md:text-lg px-4 md:px-6 py-3 md:py-4 rounded-full outline-none focus:ring-2 focus:ring-pink-500 shadow-2xl border border-gray-700"
      />
    </div>
  )
}

export default SearchBar