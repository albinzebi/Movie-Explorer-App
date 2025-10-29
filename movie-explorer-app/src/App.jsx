import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import Header from "./Header";
import Footer from "./Footer";

const API_KEY = "3111aee0";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [allResults, setAllResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const MOVIES_PER_PAGE = 3;

  const searchMovies = async () => {
    setLoading(true);
    setError("");
    setCurrentPage(1); // Reset to first page
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setAllResults(data.Search); // Save all results
        const limited = data.Search.slice(0, MOVIES_PER_PAGE);
        const detailedMovies = await Promise.all(
          limited.map(async (movie) => {
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
    const startIndex = (nextPage - 1) * MOVIES_PER_PAGE;
    const nextBatch = allResults.slice(
      startIndex,
      startIndex + MOVIES_PER_PAGE
    );

    const detailedMovies = await Promise.all(
      nextBatch.map(async (movie) => {
        const detailRes = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=short`
        );
        return await detailRes.json();
      })
    );

    setMovies((prev) => [...prev, ...detailedMovies]);
    setCurrentPage(nextPage);
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
      <Header />
      <SearchBar query={query} setQuery={setQuery} onSearch={searchMovies} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <MovieList
        movies={movies}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      {movies.length > 0 && movies.length < allResults.length && (
        <div className="load-more">
          <button onClick={loadMoreMovies}>Load More</button>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
