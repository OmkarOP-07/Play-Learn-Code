import React from 'react';
import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Oops!</h1>
        <p className="text-purple-100 mb-6">
          {error?.message || 'Something went wrong. Please try again.'}
        </p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:-translate-y-1"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorBoundary; 