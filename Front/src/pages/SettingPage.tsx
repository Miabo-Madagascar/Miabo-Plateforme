import React, { useState } from 'react';
import { UserRole, useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  bio?: string;
  phone?: string;
  location?: string;
  password?: string;
}
const SettingPage = () => {
  const { user } = useUser();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const setUser = () => {
    alert('User updated successfully');
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setUser();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center items-center bg-gray-100 p-4 pt-10"
    >
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-semibold text-gray-800">Paramètres</h1>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nom
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileImage">
            Image de profil
          </label>
          <input
            type="text"
            id="profileImage"
            value={profileImage}
            onChange={e => setProfileImage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded flex"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Enregistrer
          </button>
          <button
            type="button"
            className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold py-2 px-4 rounded ml-2 flex"
          >
            <X className="w-5 h-5 mr-2" />
            Annuler
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SettingPage;
