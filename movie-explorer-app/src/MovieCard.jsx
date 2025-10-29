import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./MovieCard.module.css";

function MovieCard({ movie, isFavorite, toggleFavorite }) {
  return (
    <div className={styles.movieCard}>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/150"}
        alt={movie.Title}
      />
      <button
        title="fav/unfav"
        className={styles.redHeart}
        onClick={() => toggleFavorite(movie)}
      >
        {isFavorite ? (
          <>
            <FavoriteIcon />
          </>
        ) : (
          <>
            <FavoriteBorderIcon />
          </>
        )}
      </button>
      <h2>{movie.Title}</h2>
      <p>
        <strong>Released:</strong> {movie.Released}
      </p>
      <p>{movie.Genre}</p>
      <p className={styles.plot}>{movie.Plot}</p>
    </div>
  );
}

export default MovieCard;
