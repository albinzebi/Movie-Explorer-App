import MovieCard from "./MovieCard";
import { Movie } from "./Movie";
import styles from "./MovieList.module.css";



interface MovieListProps {
  movies: Movie[];
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
}

function MovieList({ movies, favorites, toggleFavorite }: MovieListProps) {
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