"use client";

import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import MovieList from "@/components/MovieList/MovieList";
import { IMovieDetail } from "@/types/MovieDetail";

const NowPlayingPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
      try {
        const data = await getNowPlayingMovies();
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

    fetchNowPlayingMovies();
  }, []);

  // Mostrar las peliculas
  return (
    <div>
      <MovieList movies={movies} loading={loading} titlePage={"Popular"} />;
    </div>
  );
};

export default NowPlayingPage;
