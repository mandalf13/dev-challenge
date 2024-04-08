import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getRandomTitles } from "../../utils/tmdb";

export const fetchTitlesAsync = createAsyncThunk(
  "titles/fetchTitlesAsync",
  async (mediaType: string) => {
    try {
      const response = await getRandomTitles(mediaType);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export interface titlesState {
  titles: Record<string, any>[];
  loading: boolean;
  error: string | undefined;
}

const initialState: titlesState = {
  titles: [],
  loading: false,
  error: "",
};

const titlesSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTitlesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTitlesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.titles = action.payload;
      })
      .addCase(fetchTitlesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const selectTitles = (state: RootState) =>
  state.titles.titles;
export const selectTitlesLoading = (state: RootState) => state.titles.loading;
export const selectTitlesError = (state: RootState) => state.titles.error;

export default titlesSlice.reducer;
