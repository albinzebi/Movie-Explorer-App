import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const API_KEY = "3111aee0";
const MOVIES = ["Inception", "The Matrix", "Interstellar"];

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const results = await Promise.all(
        MOVIES.map(async (title) => {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(
              title
            )}&plot=short`
          );
          const data = await res.json();
          return {
            id: data.imdbID,
            title: data.Title,
            poster:
              data.Poster !== "N/A"
                ? data.Poster
                : "https://placehold.co/400x300",
            releaseDate: data.Released,
            genre: data.Genre,
            plot: data.Plot,
          };
        })
      );
      setMovies(results);
    }

    fetchMovies();
  }, []);

  return (
    <div className="movieList">
      {movies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default MovieList;
