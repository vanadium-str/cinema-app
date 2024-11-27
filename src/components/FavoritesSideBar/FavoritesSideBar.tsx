import { useState } from 'react';
import { Movie } from '../../types';
import Modal from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

type MovieMap = {
  [key: string]: Movie;
};

type Props = {
  favoriteMovies: MovieMap;
};

const FavoritesSideBar = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [imdbID, setImdbID] = useState('');

  const handleCollapse = () => {
    setIsCollapsed((prevState) => !prevState)
  }

  const handleOpenModal = (id: string) => {
    setImdbID(id);
    setIsModalOpen(true)
  };
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={`${isCollapsed ? 'w-10' : 'w-72'} bg-slate-100 h-full flex flex-col`}>
      <button
        className={`${!isCollapsed && 'flex justify-end mr-2'}`}
        onClick={handleCollapse}
      >
        <FontAwesomeIcon icon={isCollapsed ? faChevronRight: faChevronLeft} />
      </button>
      {!isCollapsed && (
        <>
          <div className="flex justify-center font-semibold my-3">Favorites</div>
          {Object.entries(props.favoriteMovies).map(([key, value]) => (
            <>
              <div
                key={key}
                className="py-2 px-4 cursor-pointer hover:bg-slate-200"
                onClick={() => handleOpenModal(value.imdbID)}
              >
                <img src={value.Poster} alt={value.Title} />
                <div>{value.Title}</div>
              </div>
              {isModalOpen && (
                <Modal
                  imdbID={imdbID}
                  onClose={handleCloseModal}
                />
              )}
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default FavoritesSideBar;
