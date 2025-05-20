"use client";

import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import MovieList from "@/components/MovieList/MovieList";
import { IMovieDetail } from "@/types/MovieDetail";

const TopRatedPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
      try {
        const data = await getTopRatedMovies();
        setMovies(data.results);
        console.log(
          "Esto es lo que devuelve el get popular movies: ",
          data.results
        ); //TODO clean this logs
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
  }, []);

  // Mostrar las peliculas
  return (
    <div>
      <MovieList movies={movies} loading={loading} titlePage={"Top Rated"} />;
    </div>
  );
};

export default TopRatedPage;
