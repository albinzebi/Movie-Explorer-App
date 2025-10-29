import MovieIcon from "@mui/icons-material/Movie";

function Header({ hasFavorites }) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>
        <MovieIcon /> Movie Explorer
      </h1>
      <a
        href={hasFavorites ? "#favorites" : "#"}
        style={{
          color: "#fff",
          textDecoration: "underline",
          fontSize: "0.9rem",
          marginRight: "10px",
        }}
      >
        {hasFavorites ? "Jump to Favorites" : "No Favorites"}
      </a>
    </header>
  );
}

export default Header;
