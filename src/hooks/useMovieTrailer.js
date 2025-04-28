import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/Constants";
import { addTrailerVideo } from "../utils/ReduxStore/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    if (!data.ok) {
      throw new Error("Failed to fetch movie videos");
    }

    const json = await data.json();

    if (!json || json.results.length === 0) {
      throw new Error("No videos found for this movie");
    }
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  };
  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;