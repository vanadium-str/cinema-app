import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types';

const initialState: Movie[] = [];

const favoriteMoviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.push(action.payload);
    },
  }
});

export const { addMovie } = favoriteMoviesSlice.actions;
export default favoriteMoviesSlice.reducer;