"use client";

import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import MovieList from "@/components/MovieList/MovieList";
import { IMovieDetail } from "@/types/MovieDetail";
import { Button } from "@/components/ui/button";

const NowPlayingPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // si hay más páginas

  const fetchNowPlayingMovies = async (currentPage: number) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
    try {
      const data = await getNowPlayingMovies(currentPage);
      if (currentPage === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
      setPage(data.page);
      setHasMore(data.page < data.total_pages);
    } catch (err) {
      console.error("Error loading movies: ", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNowPlayingMovies(1);
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      fetchNowPlayingMovies(page + 1);
    }
  };

  // Mostrar las peliculas
  return (
    <div>
      <MovieList movies={movies} loading={loading} titlePage={"Now Playing"} />;
      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button onClick={handleLoadMore} disabled={loading}>
            {loading ? "Cargando..." : "Cargar más"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NowPlayingPage;
