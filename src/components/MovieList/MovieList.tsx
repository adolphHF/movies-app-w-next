import MovieCard from "../MovieCard/MovieCard";
import Link from "next/link";
import { IMovieDetail } from "@/types/MovieDetail";

interface MovieProps {
  movies: IMovieDetail[];
  loading: boolean;
  titlePage: String;
}

const MovieList: React.FC<MovieProps> = ({ movies, loading, titlePage }) => (
  <div>
    <h3 className="text-3xl font-bold mb-6">{titlePage} Movies</h3>
    {/* Loading indicator */}
    {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}
    {/* Grid Layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies?.map((movie) => (
        <Link
          key={movie.id}
          href={{
            pathname: `/movie/${movie.id}`,
            query: { from: "popular" },
          }}
        >
          <MovieCard
            title={movie.title}
            voteAverage={movie.vote_average}
            posterPath={movie.poster_path}
            releaseYear={new Date(movie.release_date).getFullYear()}
            description={movie.overview}
          />
        </Link>
      ))}
    </div>
  </div>
);

export default MovieList;
