import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, GraduationCap } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if scrolled to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navbarClass = isScrolled
    ? 'bg-white shadow-md'
    : 'bg-transparent';

  const textClass = isScrolled
    ? 'text-gray-800'
    : location.pathname === '/'
      ? 'text-gray-700'
      : 'text-gray-800';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarClass}`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className={`h-8 w-8 ${textClass}`} />
            <span className={`text-xl font-bold ${textClass}`}>MIABO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium hover:text-primary-500 transition ${textClass}`}
            >
              Accueil
            </Link>
            <div className="relative group">
              <button className={`flex items-center font-medium group-hover:text-primary-500 transition ${textClass}`}>
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link
                    to="/services/tutoring"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Tutorat Personnalisé
                  </Link>
                  <Link
                    to="/services/babysitting"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Babysitting Éducatif
                  </Link>
                  <Link
                    to="/services/extracurricular"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Activités Extrascolaires
                  </Link>
                </div>
              </div>
            </div>
            <Link
              to="/about"
              className={`font-medium hover:text-primary-500 transition ${textClass}`}
            >
              À Propos
            </Link>
            <Link
              to="/contact"
              className={`font-medium hover:text-primary-500 transition ${textClass}`}
            >
              Contact
            </Link>
          </nav>

          {/* Auth buttons or user menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <img
                    src={user?.profileImage || 'https://i.pravatar.cc/150?img=1'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className={`font-medium ${textClass}`}>{user?.name}</span>
                  <ChevronDown className={`h-4 w-4 ${textClass}`} />
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link
                      to={`/dashboard/${user?.role}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Tableau de bord
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mon profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className={`font-medium hover:text-primary-500 transition ${textClass}`}>
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="font-medium py-2 hover:text-primary-500 transition"
              >
                Accueil
              </Link>
              <div className="py-2">
                <div className="flex items-center justify-between font-medium hover:text-primary-500 transition">
                  <span>Services</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="pl-4 mt-1 border-l-2 border-gray-200">
                  <Link
                    to="/services/tutoring"
                    className="block py-1 text-gray-600 hover:text-primary-500"
                  >
                    Tutorat Personnalisé
                  </Link>
                  <Link
                    to="/services/babysitting"
                    className="block py-1 text-gray-600 hover:text-primary-500"
                  >
                    Babysitting Éducatif
                  </Link>
                  <Link
                    to="/services/extracurricular"
                    className="block py-1 text-gray-600 hover:text-primary-500"
                  >
                    Activités Extrascolaires
                  </Link>
                </div>
              </div>
              <Link
                to="/about"
                className="font-medium py-2 hover:text-primary-500 transition"
              >
                À Propos
              </Link>
              <Link
                to="/contact"
                className="font-medium py-2 hover:text-primary-500 transition"
              >
                Contact
              </Link>

              {/* Auth actions for mobile */}
              <div className="pt-2 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-2 py-2">
                      <img
                        src={user?.profileImage || 'https://i.pravatar.cc/150?img=1'}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-medium">{user?.name}</span>
                    </div>
                    <Link
                      to={`/dashboard/${user?.role}`}
                      className="block py-2 hover:text-primary-500"
                    >
                      Tableau de bord
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      className="block py-2 hover:text-primary-500"
                    >
                      Mon profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left py-2 hover:text-primary-500"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link to="/login" className="btn btn-outline w-full">
                      Connexion
                    </Link>
                    <Link to="/register" className="btn btn-primary w-full">
                      S'inscrire
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
