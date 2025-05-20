"use client";
import { useEffect, useState } from "react";
import { IMovieDetail } from "@/types/MovieDetail";
import Image from "next/image";
import { getMovieById } from "@/services/movies/getMovieById";
import { markAsFavorite } from "@/services/accounts/markAsFavorite";
import { useGuestSession } from "@/providers/GuestSessionContext";
import { useParams } from "next/navigation";
import { getRecommendedMovies } from "@/services/movies/getRecommendedMovies";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovieDetail>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState<IMovieDetail[]>(
    []
  );
  const { guestSessionId } = useGuestSession();
  // Cargar detalles de la película
  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieById(id);
        setMovie(data);

        const recs = await getRecommendedMovies(id);
        setRecommendedMovies(recs.results); // el array está en `.results`
      } catch (err) {
        console.error("Error fetching movie", err);
        setError("Could not load movie.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);
  // Verificar si está en favoritos (localStorage)
  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const storedFavorites = localStorage.getItem("favoriteMovieIds");
    const favoriteIds: number[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];
    setIsFavorite(favoriteIds.includes(Number(id)));
  }, [id]);
  // Marcar o desmarcar como favorito
  const handleToggleFavorite = async () => {
    if (!guestSessionId || !movie) return;
    const newFavoriteState = !isFavorite;
    try {
      await markAsFavorite(movie.id, newFavoriteState, guestSessionId);
      setIsFavorite(newFavoriteState);
      const storedFavorites = localStorage.getItem("favoriteMovieIds");
      const favoriteIds: number[] = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
      const updatedFavorites = newFavoriteState
        ? [...new Set([...favoriteIds, movie.id])]
        : favoriteIds.filter((id) => id !== movie.id);
      localStorage.setItem(
        "favoriteMovieIds",
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };
  if (loading) return <div>Loading movie...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl w-full sm:w-64"
          width={300}
          height={450}
        />
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="italic text-slate-500">{movie.tagline}</p>
          <p>{movie.overview}</p>
          <div>
            <strong>Release:</strong> {movie.release_date.toString()}
          </div>
          <div>
            <strong>Genres:</strong>{" "}
            {movie.genres.map((g) => g.name).join(", ")}
          </div>
          <div>
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)}
          </div>
          <button
            onClick={handleToggleFavorite}
            className={`px-4 py-2 rounded ${
              isFavorite
                ? "bg-red-500 hover:bg-red-600"
                : "bg-yellow-500 hover:bg-yellow-600"
            } text-white font-bold w-max`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>

      {/* Películas recomendadas */}
      {recommendedMovies.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Películas recomendadas</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {recommendedMovies.map((movie) => (
                <CarouselItem key={movie.id} className="basis-1/2 sm:basis-1/4">
                  <div className="p-1">
                    <Link href={`/movie/${movie.id}`}>
                      <div className="border rounded-lg overflow-hidden shadow hover:shadow-md transition cursor-pointer">
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          width={300}
                          height={450}
                          className="w-full h-auto"
                        />
                        <div className="p-2">
                          <p className="text-sm font-semibold truncate">
                            {movie.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {movie.release_date &&
                              new Date(movie.release_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </div>
  );
};
export default MovieDetailPage;
