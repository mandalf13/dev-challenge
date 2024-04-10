import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  getRandomTitles,
  getSimilarTitles,
  getTitleDetails,
} from "../../utils/tmdb";

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

export const fetchSimilarTitlesAsync = createAsyncThunk(
  "titles/fetchSimilarTitlesAsync",
  async ({
    mediaType,
    titleId,
  }: {
    mediaType: string;
    titleId: number | string;
  }) => {
    try {
      const response = await getSimilarTitles(mediaType, titleId);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchTitleDetailAsync = createAsyncThunk(
  "titles/fetchTitleDetailAsync",
  async ({
    mediaType,
    titleId,
  }: {
    mediaType: string;
    titleId: number | string;
  }) => {
    try {
      const response = await getTitleDetails(mediaType, titleId);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export interface titlesState {
  title: Record<string, any>;
  mediaType: string;
  titles: Record<string, any>[];
  loading: boolean;
  error: string | undefined;
}

const initialState: titlesState = {
  title: {},
  mediaType: "movie",
  titles: [],
  loading: false,
  error: "",
};

const titlesSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setMediaType: (state, action) => {
      state.mediaType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTitlesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTitlesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.titles = action.payload;
        state.title = action.payload?.[0];
      })
      .addCase(fetchTitlesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSimilarTitlesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSimilarTitlesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.titles = action.payload;
      })
      .addCase(fetchSimilarTitlesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTitleDetailAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTitleDetailAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.title = action.payload;
      })
      .addCase(fetchTitleDetailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectCurrentTitle = (state: RootState) => state.titles.title;
export const selectMediaType = (state: RootState) => state.titles.mediaType;
export const selectTitles = (state: RootState) => state.titles.titles;
export const selectTitlesLoading = (state: RootState) => state.titles.loading;
export const selectTitlesError = (state: RootState) => state.titles.error;

export const { setTitle, setMediaType } = titlesSlice.actions;

export default titlesSlice.reducer;
