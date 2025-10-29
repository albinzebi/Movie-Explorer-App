import styles from "./SearchBar.module.css";

function SearchBar({ query, setQuery }) {
  return (
    <div className={styles.searchBar}>
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
