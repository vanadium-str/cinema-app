import { Movie } from '../../types';
import MovieItem from '../MovieItem';

type Props = {
  movies: Movie[];
};

const MovieList = (props: Props) => {
  const { movies } = props;

  return movies.length && movies.length > 0 ? (
    <div className="px-6 py-3 flex flex-wrap items-center">
      {movies.map((movie) => (
        <MovieItem movie={movie} key={movie.imdbID} />
      ))}
    </div>
  ) : (
    <div className="mt-20">
      No matches found! Every journey begins with a single step — let’s search again!
    </div>
  );
};

export default MovieList;
