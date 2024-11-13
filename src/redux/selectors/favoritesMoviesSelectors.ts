import { RootState } from '../store';

export const selectIsFavorite = (state: RootState, imdbID: string) => imdbID in state.favorites;
