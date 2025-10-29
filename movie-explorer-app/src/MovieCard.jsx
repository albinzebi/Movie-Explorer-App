import FavoriteIcon from "@mui/icons-material/Favorite";

function MovieCard({ id, title, poster, releaseDate, genre, plot }) {
  return (
    <div className="movieCard">
      <h1>{title}</h1>
      <img src={poster} alt={`${title} poster`} />
      <p>
        <strong>Release Date:</strong> {releaseDate}
      </p>
      <p>
        <strong>Genre:</strong> {genre}
      </p>
      <p>{plot}</p>
      <span>
        <FavoriteIcon />
      </span>
    </div>
  );
}

export default MovieCard;
