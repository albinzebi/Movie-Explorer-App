import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import MovieList from "./MovieList";

function App() {
  return (
    <div>
      <Header />
      <MovieList />
      <Footer />
    </div>
  );
}

export default App;
