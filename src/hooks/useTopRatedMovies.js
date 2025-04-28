import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/Constants";
import { addTopRatedMovies } from "../utils/ReduxStore/moviesSlice";
import { useSelector } from "react-redux";
const useTopRatedMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
  const getTopRatedMovies = async () => {
    try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    if (!data.ok) {
      throw new Error("Failed to fetch data from TMDB API");
    }
    const json = await data.json();
    if (json.results.length === 0) {
      console.warn("No top rated movies found");
    }
    else{
      dispatch(addTopRatedMovies(json.results));
    }
  }catch (error) {
    console.error("Error fetching top rated movies:", error);
    }
  };

  useEffect(() => {
    if (!topRatedMovies || topRatedMovies.length === 0) {
      getTopRatedMovies();
    }
  }, []);
};

export default useTopRatedMovies;