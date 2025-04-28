import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/Constants";
import { addPopularMovies } from "../utils/ReduxStore/moviesSlice";
import { useSelector } from "react-redux";
const usePopularMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  const getPopularMovies = async () => {
    try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    if (!data.ok) {
      throw new Error("Error fetching popular movies");
    }
    const json = await data.json();
    // Check if data is empty or not    
    if (json.results.length === 0) {
      console.warn("No popular movies found");
    }
    else{
    dispatch(addPopularMovies(json.results));
    }
  }catch (error) {
    console.error("Error fetching popular movies:", error);
  }
  };

  useEffect(() => {
    if (!popularMovies || popularMovies.length === 0) {
      getPopularMovies();
    }
  }, []);
};

export default usePopularMovies;