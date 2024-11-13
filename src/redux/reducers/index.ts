import { combineReducers } from 'redux';
import favoriteMoviesReducer from './favoriteMoviesSlice';

const rootReducer = combineReducers({
  favorites: favoriteMoviesReducer,
});

export default rootReducer;