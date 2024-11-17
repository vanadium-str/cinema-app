import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { Movie } from '../../types';
import Error from '../Error';
import Loading from '../Loading';

const url = import.meta.env.VITE_MOVIES_API;
const apiKey = import.meta.env.VITE_MOVIES_API_KEY;

type Props = {
  imdbID: string;
};

const FullPlot = (props: Props) => {
  const { fetchState, fetchData } = useFetch<Movie>(
    `${url}?apikey=${apiKey}&i=${props.imdbID}&plot=full`
  );

  useEffect(() => {
    fetchData();
  }, []);

  if (fetchState.error) {
    return (
      <div className="flex items-center justify-center w-full">
        <Error error={fetchState.error} />
      </div>
    );
  }

  if (fetchState.loading) {
    return (
      <div className="flex items-center justify-center w-full">
        <Loading />
      </div>
    );
  }

  if (fetchState.data?.Plot) {
    return <p className="mt-3">{fetchState.data?.Plot}</p>;
  }

  return null;
};

export default FullPlot;
