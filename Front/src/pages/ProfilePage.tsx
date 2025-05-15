import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, User } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { user } = useUser();

  
  return (
    <div className="flex justify-center items-center bg-gray-100 p-4 pt-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl"
      >
        <div className="flex flex-col items-center text-center">
          <motion.img
            src={user?.profileImage || '/images/default-avatar.png'}
            alt="Profile picture"
            className="w-36 h-36 rounded-full border-4 border-primary-500 shadow-md mb-4"
            whileHover={{ scale: 1.05 }}
          />
          <h1 className="text-3xl font-semibold text-gray-800">{user?.name || 'Nom inconnu'}</h1>
          <p className="text-gray-500">{user?.email || 'Email non défini'}</p>

          <div className="mt-2">
            <span
              className={`px-4 py-1 text-sm rounded-full font-medium ${
                user?.role === 'tutor'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-blue-100 text-blue-600'
              }`}
            >
              {user?.role || 'Utilisateur'}
            </span>
          </div>

          <Link
            to="/dashboard/settings"
            className="mt-6 inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-5 py-2 rounded-xl transition"
          >
            <CheckCircle className="w-5 h-5" />
            Modifier mon profil
          </Link>
        </div>

        <div className="mt-8 border-t pt-6 text-left">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">À propos de moi</h2>
          <p className="text-gray-600">
            {"Aucune biographie disponible. Mettez à jour votre profil pour ajouter une description."}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
