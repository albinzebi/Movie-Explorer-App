import styles from "./SearchBar.module.css";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
}

function SearchBar({ query, setQuery }: SearchBarProps) {
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