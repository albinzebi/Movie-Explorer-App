import MovieCard from "./MovieCard";
import styles from "./MovieList.module.css";

function MovieList({ movies, favorites, toggleFavorite }) {
  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}

export default MovieList;
