import { useState } from 'react';

type Props = {
  className?: string;
}

const FavoriteButton = (props: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <button
      className={`${props.className} flex items-center justify-center w-12 h-12 transition duration-300 
        rounded-full focus:outline-none hover:bg-lime-600 ${isFavorite ? 'bg-lime-600' : 'bg-slate-100'}`}
      onClick={toggleFavorite}
    >
      <svg
        className={`w-6 h-6 hover:text-white ${isFavorite ? 'text-white' : 'text-lime-600'}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;
