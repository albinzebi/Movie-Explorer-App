import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import Header from "./Header";
import { Movie } from "./Movie";
import ErrorIcon from "@mui/icons-material/Error";
import styles from "./App.module.css";

const API_KEY = "3111aee0";



function App() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        searchMovies();
      } else {
        setMovies([]);
        setError("");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const searchMovies = async () => {
    setLoading(true);
    setError("");
    setCurrentPage(1);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=1`
      );
      const data = await res.json();
      if (data.Response === "True") {
        const detailedMovies: Movie[] = await Promise.all(
          data.Search.map(async (movie: { imdbID: string }) => {
            const detailRes = await fetch(
              `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=short`
            );
            return await detailRes.json();
          })
        );
        setMovies(detailedMovies);
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMovies = async () => {
    const nextPage = currentPage + 1;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${nextPage}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        const detailedMovies: Movie[] = await Promise.all(
          data.Search.map(async (movie: { imdbID: string }) => {
            const detailRes = await fetch(
              `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=short`
            );
            return await detailRes.json();
          })
        );
        setMovies((prev) => [...prev, ...detailedMovies]);
        setCurrentPage(nextPage);
      }
    } catch (err) {
      setError("Failed to load more movies.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (movie: Movie) => {
    const exists = favorites.find((fav) => fav.imdbID === movie.imdbID);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="app">
      <Header hasFavorites={favorites.length > 0} />
      <SearchBar query={query} setQuery={setQuery} />
      {loading && (
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
          <p>Searching for movies...</p>
        </div>
      )}
      {error && (
        <div className={styles.errorState}>
          <p className={styles.errorMessage}>
            <ErrorIcon /> {error}
          </p>
        </div>
      )}
      {!loading && movies.length === 0 && !error && (
        <p className={styles.emptyMessage}>Start by searching for a movie!</p>
      )}
      <MovieList
        movies={movies}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      {movies.length > 0 && (
        <div className={styles.loadMore}>
          <button onClick={loadMoreMovies}>Load More</button>
        </div>
      )}
      {favorites.length > 0 && (
        <>
          <h2 id="favorites" className={styles.favoritesHeading}>
            Your Favorites
          </h2>
          <MovieList
            movies={favorites}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </>
      )}
    </div>
  );
}

export default App;