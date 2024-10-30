import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Header from '../../components/Header';
import MovieList from '../../components/MovieList';
import { FetchResponse } from '../../types';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const url = import.meta.env.VITE_MOVIES_API;
const apiKey = import.meta.env.VITE_MOVIES_API_KEY;

const HomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const { fetchState, fetchData } = useFetch<FetchResponse>(
    `${url}?apikey=${apiKey}&s=${inputValue}`
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const renderContent = () => {
    if (fetchState.loading) {
      return <Loading />;
    }
    if (fetchState.error) {
      return <Error error={fetchState.error} />;
    }
    if (fetchState.data?.Search) {
      return <MovieList movies={fetchState.data.Search} />;
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center my-4">
        <h1 className="mb-4 text-lg font-semibold">Looking for a movie? Type the title:</h1>
        <div className="flex items-center">
          <input
            className="border-solid border-2 border-black rounded mr-8 p-2 focus:border-white"
            type="text"
            placeholder="Search by movie title..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className="bg-lime-600 px-3 py-2 rounded text-white" onClick={fetchData}>
            Search
          </button>
        </div>
        {renderContent()}
      </div>
    </>
  );
};

export default HomePage;
