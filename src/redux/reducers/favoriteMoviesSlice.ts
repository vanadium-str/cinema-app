import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types';

const initialState: Record<string, Movie> = {};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      if (state[movie.imdbID]) {
        delete state[movie.imdbID];
      } else {
        state[movie.imdbID] = movie;
      }
    },
  }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;