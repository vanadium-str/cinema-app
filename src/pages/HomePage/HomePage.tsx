import { useState } from 'react';
import Header from '../../components/Header';
import { FetchResponse, FetchState } from '../../types';
import MovieList from '../../components/MovieList';

const url = import.meta.env.VITE_MOVIES_API;
const apiKey = import.meta.env.VITE_MOVIES_API_KEY;

const HomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [fetchState, setFetchState] = useState<FetchState>({
    data: undefined,
    loading: false,
    error: false,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async () => {
    setFetchState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    try {
      const res = await fetch(`${url}?apikey=${apiKey}&s=${inputValue}`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data: FetchResponse = await res.json();
      setFetchState((prevState) => ({
        ...prevState,
        data,
        loading: false,
        error: false,
      }));
    } catch (error: any) {
      setFetchState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.message || 'Something went wrong',
      }));
    }
  };

  const renderContent = () => {
    console.log(fetchState)
    if (fetchState.loading) {
      return (
        <div className="flex justify-center items-center">
          <div
            className="loader border-t-2 border-b-2 border-lime-600
              border-solid rounded-full w-16 h-16 animate-spin mt-20"
          ></div>
        </div>
      );
    }
    if (fetchState.error) {
      return <div className="mt-20 text-red-700">{fetchState.error || 'Something went wrong!'}</div>;
    }
    if (fetchState.data?.Search) {
      return <MovieList movies={fetchState.data.Search} />;
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center my-4">
        <h1 className="mb-4 text-lg">Looking for a movie? Type the title:</h1>
        <div className="flex">
          <input
            className="border-solid border-2 border-black rounded mr-8 p-1"
            type="text"
            placeholder="Search by movie title..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className="bg-lime-600 px-3 py-1 rounded text-white" onClick={handleSearch}>
            Search
          </button>
        </div>
        {renderContent()}
      </div>
    </>
  );
};

export default HomePage;
