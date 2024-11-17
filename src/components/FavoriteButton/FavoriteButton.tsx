import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from 'react-redux';
import { Movie } from "../../types";
import { toggleFavorite } from "../../redux/reducers/favoriteMoviesSlice";
import { selectIsFavorite } from "../../redux/selectors/favoritesMoviesSelectors";
import FavoriteIcon from "../FavoriteIcon";

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
      <FavoriteIcon isFavorite={isFavorite} />
    </button>
  );
};

export default FavoriteButton;
