import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { GraduationCap, Mail, Lock, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      // Use the email to determine where to redirect
      if (email === 'eleve@exemple.com') {
        navigate('/dashboard/student');
      } else if (email === 'tuteur@exemple.com') {
        navigate('/dashboard/tutor');
      } else if (email === 'parent@exemple.com') {
        navigate('/dashboard/parent');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err as string);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto p-8 bg-white shadow-md rounded-xl"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <GraduationCap className="h-12 w-12 text-primary-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Connexion à MIABO</h1>
          <p className="mt-2 text-gray-600">
            Entrez vos identifiants pour accéder à votre espace personnel
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-10"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-10"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full btn btn-primary py-2.5"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Vous n'avez pas encore de compte ?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              S'inscrire
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Comptes de démonstration</span>
            </div>
          </div>

          <div className="mt-4 grid gap-2">
            <button
              type="button"
              onClick={() => {
                setEmail('eleve@exemple.com');
                setPassword('password');
              }}
              className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg"
            >
              Compte élève
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('tuteur@exemple.com');
                setPassword('password');
              }}
              className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg"
            >
              Compte tuteur
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('parent@exemple.com');
                setPassword('password');
              }}
              className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg"
            >
              Compte parent
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;