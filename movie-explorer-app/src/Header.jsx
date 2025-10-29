import MovieIcon from "@mui/icons-material/Movie";
import styles from "./Header.module.css";

function Header({ hasFavorites }) {
  return (
    <header className={styles.header}>
      <h1>
        <MovieIcon /> Movie Explorer
      </h1>
      <a href={hasFavorites ? "#favorites" : "#"}>
        {hasFavorites ? "Jump to Favorites" : "No Favorites"}
      </a>
    </header>
  );
}

export default Header;
