import { Movie } from '../../types';

type Props = {
  movie: Movie;
};

const MovieItem = (props: Props) => {
  const { movie } = props;

  return (
    <div className="bg-white w-96 h-72 flex p-3 m-3">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="ml-2">
        <h3 className="text-lg font-semibold">{movie.Title}</h3>
        <p className="text-gray-600">{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieItem;
