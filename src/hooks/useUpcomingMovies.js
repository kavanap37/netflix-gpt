import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/Constants";
import { addUpcomingMovies } from "../utils/ReduxStore/moviesSlice";
import { useSelector } from "react-redux";
const useUpcomingMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);
  const getUpcomingMovies = async () => {
    try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );
    if (!data.ok) {
      throw new Error("Failed to fetch upcoming movies");
    }
    const json = await data.json();
    if (json && json.results) {
    dispatch(addUpcomingMovies(json.results));
  } else {
      console.error("Invalid data structure:", json);
    };
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
  }
  };

  useEffect(() => {
    if (!upcomingMovies || upcomingMovies.length === 0) {
    getUpcomingMovies();
    }
  }, []);
};

export default useUpcomingMovies ;