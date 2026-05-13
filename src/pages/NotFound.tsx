import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiHome } from 'react-icons/fi';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found — ST. Francis Mat. Hr. School</title>
      </Helmet>
      <main className="min-h-[70vh] flex items-center justify-center bg-gray-light">
        <div className="text-center px-4">
          <div className="text-8xl md:text-9xl font-display font-bold text-primary/20 mb-4">404</div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Page Not Found</h1>
          <p className="text-gray-mid font-body text-lg mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn btn-primary text-base px-8 py-4">
            <FiHome className="mr-2" />
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
