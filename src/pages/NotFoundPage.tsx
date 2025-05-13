import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">Page non trouvée</h2>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="btn btn-primary flex items-center"
          >
            <Home className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Page précédente
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;