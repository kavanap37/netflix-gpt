import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from '../utils/Constants'
import { addNowPlayingMovies } from "../utils/ReduxStore/moviesSlice";
import { useSelector } from "react-redux";
const useNowPlayingMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();
  const nowPlayMovies = useSelector((store) => store.movies.nowPlayingMovies);
  const getNowPlayingMovies = async () => {
    try{
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    if (!data.ok) {
      throw new Error("Failed to fetch data from TMDB API");
    }
    // Check if the response is ok (status code 200-299)
    const json = await data.json();
    // If the response is not ok, throw an error
    if (!json) {
      console.warn("Failed to fetch data from TMDB API");
    }
    else{
      dispatch(addNowPlayingMovies(json.results));
    }
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
  }
  };

  useEffect(() => {
    if (!nowPlayMovies || nowPlayMovies.length === 0) {
      getNowPlayingMovies();
    }
  }, []);
};

export default useNowPlayingMovies;