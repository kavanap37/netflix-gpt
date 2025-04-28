import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/Constants";
import { addGptMovies } from "../utils/ReduxStore/gptSlice";
import geminiOutput from "../utils/geminiai";
const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);
  //TMDB SEARCH
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results[0];
  };

  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya. " +
      "Please do not give me any other information or explanation. Just give me the movie names in a comma separated format. If you don't know any movie names, please give 1 movie suggestion which have atleast some characters of the requested query.";
    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gemini-1.5-flash-002",
    // });
    try {
      const gptResults = await geminiOutput(gptQuery);
      if (!gptResults || gptResults.length === 0) {
        console.error("No movie suggestions received.");
        return;
      }
      // console.log(gptResults);
      // console.log(gptResults.choices?.[0]?.message?.content);
      // const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
      const promiseArray = gptResults.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);
      dispatch(
        addGptMovies({
          movieNames: gptResults,
          movieResults: tmdbResults,
          searchValue: searchText.current.value,
        })
      );
    } catch (error) {
      console.error("Error getting response from Gemini API:", error.message);
    }
  };
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
        >
          {" "}
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
