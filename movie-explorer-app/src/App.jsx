import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import Header from "./Header";

const API_KEY = "3111aee0";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        searchMovies();
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
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
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
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
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

  const toggleFavorite = (movie) => {
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
        <div className="movie-list">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton" />
          ))}
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {!loading && movies.length === 0 && !error && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Start by searching for a movie!
        </p>
      )}
      <MovieList
        movies={movies}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      {movies.length > 0 && (
        <div className="load-more">
          <button onClick={loadMoreMovies}>Load More</button>
        </div>
      )}
      {favorites.length > 0 && (
        <>
          <h2 id="favorites" style={{ textAlign: "center", marginTop: "40px" }}>
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
