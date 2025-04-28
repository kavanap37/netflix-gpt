import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    isLoading: false,
    movieResults: [],
    movieNames: [],
    searchValue: "",
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovies: (state, action) => {
      const { movieNames, movieResults, searchValue } = action.payload;
      state.movieNames = Array.isArray(movieNames) ? movieNames : [];
      state.movieResults = Array.isArray(movieResults) ? movieResults : [];
      state.searchValue = typeof searchValue === "string" ? searchValue : "";
    },
  },
});

export const { toggleGptSearchView , addGptMovies } = gptSlice.actions;

export default gptSlice.reducer;