import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/Constants";
import { addTrendingMovies } from "../utils/ReduxStore/moviesSlice";
import { useSelector } from "react-redux";
const useTrendingMovies = async () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();
  const trendingMovies = useSelector((store) => store.movies.trendingMovies);
  const getTrendingMovies = async () => {
    try{
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?page=1",
      API_OPTIONS
    );
    if (!data.ok) {
      throw new Error("Failed to fetch data");
    }
    const json = await data.json();
    if (json.results.length === 0) {
      console.warn("No trending movies found");
    }
    else{
      dispatch(addTrendingMovies(json.results));
    }
  }catch (error) {
    console.error("Error fetching trending movies:", error); 
  }
    
  };

  useEffect(() => {
    if (!trendingMovies || trendingMovies.length === 0) {
      getTrendingMovies();
    }
  }, []);
};

export default useTrendingMovies;