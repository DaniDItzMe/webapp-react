import { useEffect } from "react";
import MovieCard from "../components/MovieCard";

import axios from "axios";
import { useState } from "react";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/api/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error(err.message));
  }, []);

  const RenderMovies = () => {
    return movies?.map((movie) => (
      <div key={movie.id} className="col d-flex">
        <MovieCard movie={movie} />
      </div>
    ));
  };

  return (
    <>
      <h1 className="text-center">Sfoglia i nostri film</h1>

      <div className="row row-cols-4 pt-3 g-5">{RenderMovies()}</div>
    </>
  );
}
