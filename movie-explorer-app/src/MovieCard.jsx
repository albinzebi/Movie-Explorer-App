import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function MovieCard({ movie, isFavorite, toggleFavorite }) {
  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/150"}
        alt={movie.Title}
      />
      <button
        title="fav/unfav"
        className="red-heart"
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
      <p>{movie.Plot}</p>
    </div>
  );
}

export default MovieCard;
