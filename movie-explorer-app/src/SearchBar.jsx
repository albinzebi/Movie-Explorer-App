function SearchBar({ query, setQuery }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        placeholder="Search movies..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
