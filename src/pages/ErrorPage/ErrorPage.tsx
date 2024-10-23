import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold text-center mx-3 sm:mx-1">
        Oops! We couldn’t find the page you’re looking for
      </h1>
      <h1 className="text-xl mt-5 text-center mx-3 sm:mx-1">
        It looks like this page is missing or the URL is incorrect
      </h1>
      <Link to="/" className="my-10 bg-blue-500 text-white text-xl p-2 rounded-md">
        Go Back to Movies
      </Link>
    </div>
  );
};

export default ErrorPage;
