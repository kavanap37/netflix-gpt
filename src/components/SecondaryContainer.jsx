import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className="px-2 md:pl-12 mt-0 md:-mt-48 relative z-20 scrollbar-none ">
        <MovieList title={"Trending"} movies={movies.trendingMovies || []} />
        <MovieList
          title={"Now Playing"}
          movies={movies.nowPlayingMovies || []}
        />
        <MovieList title={"Top Rated"} movies={movies.topRatedMovies || []} />
        <MovieList title={"Popular"} movies={movies.popularMovies || []} />
        <MovieList
          title={"Upcoming Movies"}
          movies={movies.upcomingMovies || []}
        />
      </div>
    )
  );
};

export default SecondaryContainer;
