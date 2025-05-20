"use client";
import React, { useEffect, useState } from "react";
import MovieList from "@/components/MovieList/MovieList";
import { getFavoriteMovies } from "@/services/accounts/getFavoriteMovies";
import { useGuestSession } from "@/providers/GuestSessionContext";
import { IMovieDetail } from "@/types/MovieDetail";
const MyFavoritesPage = () => {
  const { guestSessionId } = useGuestSession();
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!guestSessionId) return;
      setLoading(true);
      try {
        const data = await getFavoriteMovies(guestSessionId);
        setMovies(data?.results || []);
      } catch (err) {
        console.error("Error loading favorite movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [guestSessionId]);
  return (
    <div>
      {loading && (
        <h5 className="text-lg text-gray-500">Loading favorites...</h5>
      )}
      {!loading && movies.length === 0 && (
        <div className="text-center mt-10 text-gray-600">
          <p className="text-xl">You don't have any favorite movies yet.</p>
          <p className="text-sm mt-2">
            Go to a movie's detail page and click "Add to Favorites" to see it
            here.
          </p>
        </div>
      )}
      {!loading && movies.length > 0 && (
        <MovieList
          movies={movies}
          loading={loading}
          titlePage={"My Favorite"}
        />
      )}
    </div>
  );
};
export default MyFavoritesPage;
