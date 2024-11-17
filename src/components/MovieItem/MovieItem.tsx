import { useState } from 'react';
import { Movie } from '../../types';
import Modal from '../Modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { selectIsFavorite } from '../../redux/selectors/favoritesMoviesSelectors';
import FavoriteIcon from '../FavoriteIcon';

type Props = {
  movie: Movie;
};

const MovieItem = (props: Props) => {
  const { movie } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isFavorite = useSelector((state: RootState) =>
    selectIsFavorite(state, movie.imdbID)
  );

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className="bg-white w-96 h-72 flex p-3 m-3 cursor-pointer hover:bg-slate-100"
        onClick={handleOpenModal}
      >
        <img src={movie.Poster} alt={movie.Title} />
        <div className="ml-2">
          <h3 className="text-lg font-semibold">{movie.Title}</h3>
          <p className="text-gray-600">{movie.Year}</p>
          {isFavorite && (
            <div className="bg-lime-600 w-fit rounded-full mt-2 p-2">
              <FavoriteIcon isFavorite />
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal
          imdbID={movie.imdbID}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default MovieItem;
