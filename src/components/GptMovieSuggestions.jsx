import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  console.log(movieResults);
  console.log(movieNames);
  if (!movieResults || movieResults.length === 0) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90 z-40 mt-[150px] md:mt-[150px]">
      <div className="flex flex-col md:flex-row justify-between items-center flex-wrap w-full">
        {movieResults.map((movie) => (
          <MovieCard title={movie.title} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
