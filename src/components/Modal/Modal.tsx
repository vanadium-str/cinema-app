import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { Movie } from '../../types';
import Loading from '../Loading';
import Error from '../Error';
import FavoriteButton from '../FavoriteButton';
import FullPlot from '../FullPlot';

const url = import.meta.env.VITE_MOVIES_API;
const apiKey = import.meta.env.VITE_MOVIES_API_KEY;

type Props = {
  imdbID: string;
  onClose(): void;
};

const Modal = (props: Props) => {
  const { fetchState, fetchData } = useFetch<Movie>(`${url}?apikey=${apiKey}&i=${props.imdbID}`);
  const [isFullPlot, setIsFullPlot] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const renderContent = () => {
    if (fetchState.loading) {
      return (
        <div className="flex items-center justify-center w-full">
          <Loading />
        </div>
      );
    }
    if (fetchState.error) {
      setTimeout(() => {
        props.onClose();
      }, 5000);

      return (
        <div className="flex items-center justify-center w-full">
          <Error error={fetchState.error} />
        </div>
      );
    }
    if (fetchState.data) {
      return (
        <>
          <img src={fetchState.data?.Poster} alt={fetchState.data?.Title} />
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{fetchState.data?.Title}</h3>
            <p className='mt-2'>{fetchState.data?.Runtime}</p>
            <p className="text-gray-600">{fetchState.data?.Year}</p>
            {isFullPlot ? (
              <FullPlot imdbID={props.imdbID} />
            ) : (
              <p className="mt-3">{fetchState.data?.Plot}</p>
            )}
            <p
              className="mt-3 text-sm underline text-slate-700 cursor-pointer"
              onClick={handleClickFullPlot}
            >
              {isFullPlot ? 'Hide' : 'Show'} a full plot
            </p>
            <FavoriteButton className='mt-4' movie={fetchState.data} />
          </div>
        </>
      );
    }
  };

  const handleClickFullPlot = () => {
    setIsFullPlot((prevState) => !prevState);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white relative rounded-lg shadow-lg flex p-3 m-3 w-2/3 h-2/3">
        <button
          className="absolute top-0 right-2 text-2xl text-gray-600 hover:text-gray-800"
          onClick={props.onClose}
        >
          &times;
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default Modal;
