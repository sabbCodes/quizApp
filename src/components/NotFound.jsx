import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Oops! The page you&#39;re looking for doesn&#39;t exist.</p>
      <Link to="/courseSelection" className="mt-6 px-4 py-2 bg-biochem text-white rounded-md hover:bg-drkbiochem">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
