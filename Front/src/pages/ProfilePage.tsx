import { Link } from 'react-router-dom';
import { BookOpenCheck, CheckCircle, Info, Mail, Rocket, Shield, Target, User } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { user } = useUser();

  return (
    <div className="bg-gray-100">
      {/* Image de couverture */}
      <div className="relative h-60 bg-cover bg-center" style={{ backgroundImage: `url('/cover-miabo.jpg')` }}>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Profil principal */}
      <div className="relative ml-4 px-8 -mt-24 flex flex-col md:flex-row md:items-end gap-6">
        {/* Avatar */}
        <img
          src={user?.profileImage || '/images/default-avatar.png'}
          alt="Profile"
          className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
        />

        {/* Infos de base */}
        <div className="text-left w-max">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 w-max">
            {user?.name || 'Nom inconnu'}
            <span className={`px-3 py-1 text-xs rounded-full font-medium ${
              user?.role === 'tutor'
                ? 'bg-red-100 text-red-600'
                : 'bg-blue-100 text-blue-600'
            }`}>
              {user?.role || 'Utilisateur'}
            </span>
          </h1>
          <p className="text-gray-600 text-sm">{user?.email || 'Email non défini'}</p>
        </div>

		        {/* Bouton Modifier */}
        <div className="mt-4 flex w-full justify-end">
            <Link
              to="/dashboard/settings"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              <CheckCircle className="w-4 h-4" />
              Modifier mon profil
            </Link>
        </div>
      </div>

	  <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="mx-auto mt-12 px-8 grid grid-cols-1 md:grid-cols-2 gap-8"
>
  {/* Carte Informations personnelles */}
  <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-2xl transition-transform transform hover:scale-[1.02] duration-300 group cursor-pointer relative">
    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-5 flex items-center gap-2">
      <User className="w-5 h-5 text-blue-500" /> Informations personnelles
    </h2>
    <ul className="space-y-4 text-gray-700">
      <li className="flex items-center gap-2">
        <User className="w-4 h-4 text-gray-500" />
        <span className="font-semibold text-sm text-gray-600">Nom :</span>
        <span className="fond-medium"> {user?.name || 'Non défini'}</span>
      </li>
      <li className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-gray-500" />
        <span className="font-semibold text-sm text-gray-600">Email :</span>
        <span className="fond-medium">{user?.email || 'Non défini'}</span>
      </li>
      <li className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-gray-500" />
        <span className="font-semibold text-sm text-gray-600">Rôle :</span>
        <span className="fond-medium">{user?.role || 'Utilisateur'}</span>
      </li>
    </ul>
  </div>

  {/* Carte À propos de MIABO */}
  <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-2xl transition-transform transform hover:scale-[1.02] duration-300 group">
    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-5 flex items-center gap-2">
      <Info className="w-5 h-5 text-purple-500" /> À propos de MIABO Madagascar
    </h2>
    <p className="text-gray-700 text-sm leading-relaxed mb-4">
      MIABO Madagascar est une entreprise éducative fondée par <strong>Dihariniaina RABEARIMANANA</strong>. Elle propose du soutien scolaire, du babysitting ludique, de l’encadrement extrascolaire, et développe des solutions technologiques éducatives.
    </p>
    <div className="text-sm text-gray-700 space-y-3">
      <p className="flex items-start gap-2">
        <Rocket className="w-4 h-4 text-green-500 mt-0.5" />
        <span><strong>Vision :</strong> Devenir un leader de l'éducation à Madagascar grâce à des solutions technologiques innovantes.</span>
      </p>
      <p className="flex items-start gap-2">
        <BookOpenCheck className="w-4 h-4 text-blue-500 mt-0.5" />
        <span><strong>Mission :</strong> Offrir un accès équitable à une éducation de qualité et favoriser l’employabilité des jeunes.</span>
      </p>
      <p className="flex items-start gap-2">
        <Target className="w-4 h-4 text-rose-500 mt-0.5" />
        <span><strong>Objectif :</strong> Créer un système de tutorat personnalisé reliant élèves, tuteurs et parents.</span>
      </p>
    </div>
  </div>
</motion.div>
    </div>
  );
};

export default ProfilePage;
