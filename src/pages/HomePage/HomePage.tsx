import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import useFetch from '../../hooks/useFetch';
import Header from '../../components/Header';
import MovieList from '../../components/MovieList';
import { FetchResponse } from '../../types';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import FavoritesSideBar from '../../components/FavoritesSideBar';
import Pagination from '../../components/Pagination';

const url = import.meta.env.VITE_MOVIES_API;
const apiKey = import.meta.env.VITE_MOVIES_API_KEY;

const HomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchState, fetchData } = useFetch<FetchResponse>(
    `${url}?apikey=${apiKey}&s=${inputValue}&page=${currentPage}`
  );
  const favoriteMovies = useSelector((state: RootState) => state.favorites);
  const totalPages = fetchState.data?.totalResults
    ? Math.floor(+fetchState.data.totalResults / 10)
    : 1;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  };

  const renderContent = () => {
    if (fetchState.loading) {
      return <Loading />;
    }
    if (fetchState.error) {
      return <Error error={fetchState.error} />;
    }
    if (fetchState.data?.Search) {
      return (
        <>
          <MovieList movies={fetchState.data.Search} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            goToPage={goToPage}
          />
        </>
      );
    }
  };

  const goToPage = (page: number | string) => {
    if (page === '...') return;
    setCurrentPage(+page);
  };
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <Header />
      <div className="flex h-screen">
        {Object.keys(favoriteMovies).length !== 0 && (
          <FavoritesSideBar favoriteMovies={favoriteMovies} />
        )}
        <div className="w-full flex flex-col items-center my-4">
          <h1 className="mb-4 text-lg font-semibold">Looking for a movie? Type the title:</h1>
          <div className="flex items-center">
            <input
              className="border-solid border-2 border-black rounded mr-8 p-2 focus:border-white"
              type="text"
              placeholder="Search by movie title..."
              value={inputValue}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
            />
            <button className="bg-lime-600 px-3 py-2 rounded text-white" onClick={fetchData}>
              Search
            </button>
          </div>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default HomePage;
