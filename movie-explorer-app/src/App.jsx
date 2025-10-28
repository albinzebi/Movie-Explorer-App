import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import MovieCard from "./MovieCard";

function App() {
  return (
    <div>
      <Header />
      <MovieCard />
      <Footer />
    </div>
  );
}

export default App;
