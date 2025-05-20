"use client";

import { useEffect, useState } from "react";
import { getTrendingPeople } from "@/services/people/getTrendingPeople";
import { getTrendingSeries } from "@/services/series/getTrendingSeries";
import { getTrendingMovies } from "@/services/movies/getTrendingMovies";
import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Person {
  id: number;
  name: string;
  profile_path: string;
}

interface Series {
  id: number;
  name: string;
  poster_path: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function Home() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [trendingPersons, trendingSeries, popularMovies] =
        await Promise.all([
          getTrendingPeople(),
          getTrendingSeries(),
          getTrendingMovies(),
        ]);
      setPersons(trendingPersons);
      setSeries(trendingSeries);
      setMovies(popularMovies);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-12 px-4 sm:px-8">
      {/* Personas en tendencia */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Trending People</h2>
        <Carousel className="w-full">
          <CarouselContent>
            {persons.map((person) => (
              <CarouselItem key={person.id} className="basis-1/2 sm:basis-1/5">
                <div className="p-2 text-center">
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                    alt={person.name}
                    width={200}
                    height={300}
                    className="rounded-lg mx-auto"
                  />
                  <p className="mt-2 text-sm">{person.name}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Series en tendencia */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Trending series</h2>
        <Carousel className="w-full">
          <CarouselContent>
            {series.map((tv) => (
              <CarouselItem key={tv.id} className="basis-1/2 sm:basis-1/5">
                <Link href={`/series/${tv.id}`}>
                  <div className="p-2">
                    <Image
                      src={`https://image.tmdb.org/t/p/w300${tv.poster_path}`}
                      alt={tv.name}
                      width={200}
                      height={300}
                      className="rounded-lg"
                    />
                    <p className="mt-2 text-sm text-center">{tv.name}</p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Películas recomendadas (populares) */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Trending Movies</h2>
        <Carousel className="w-full">
          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem key={movie.id} className="basis-1/2 sm:basis-1/5">
                <Link href={`/movie/${movie.id}`}>
                  <div className="p-2">
                    <Image
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      width={200}
                      height={300}
                      className="rounded-lg"
                    />
                    <p className="mt-2 text-sm text-center">{movie.title}</p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </div>
  );
}
