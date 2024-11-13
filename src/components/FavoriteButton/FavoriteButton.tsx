import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from 'react-redux';
import { Movie } from "../../types";
import { toggleFavorite } from "../../redux/reducers/favoriteMoviesSlice";
import { selectIsFavorite } from "../../redux/selectors/favoritesMoviesSelectors";

type Props = {
  className?: string;
  movie: Movie;
};

const FavoriteButton = (props: Props) => {
  const { className, movie } = props;
  const dispatch = useDispatch();

  const isFavorite = useSelector((state: RootState) =>
    selectIsFavorite(state, movie.imdbID)
  );

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(movie));
  };

  return (
    <button
      className={`${className} flex items-center justify-center w-12 h-12 transition duration-300 
        rounded-full focus:outline-none hover:bg-lime-600 ${
          isFavorite ? 'bg-lime-600' : 'bg-slate-100'
        }`}
      onClick={handleToggleFavorite}
    >
      <svg
        className={`w-6 h-6 hover:text-white ${isFavorite ? 'text-white' : 'text-lime-600'}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;
