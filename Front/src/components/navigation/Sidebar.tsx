import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  GraduationCap, X, Home, Users, BookOpen, Calendar,
  MessageSquare, Award, BarChart, Settings, Lightbulb, FileEdit, User
} from 'lucide-react';
import { UserRole } from '../../context/UserContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, userRole }) => {
  // Define navigation items based on user role
  const navItems = React.useMemo(() => {
    const commonItems = [
      { path: `/dashboard/${userRole}`, label: 'Tableau de bord', icon: <Home size={20} /> },
      { path: '/dashboard/messaging', label: 'Messagerie', icon: <MessageSquare size={20} /> },
    ];

    const studentItems = [
      ...commonItems,
      { path: '/dashboard/tests', label: 'Tests & Évaluations', icon: <Lightbulb size={20} /> },
      { path: '/dashboard/matching', label: 'Trouver un tuteur', icon: <Users size={20} /> },
      { path: '/dashboard/profile', label: 'Mon profil', icon: <User size={20} /> },
    ];

    const tutorItems = [
      ...commonItems,
      { path: '/dashboard/planning', label: 'Outils de planification', icon: <FileEdit size={20} /> },
      { path: '/dashboard/training', label: 'Espace formation', icon: <BookOpen size={20} /> },
      { path: '/dashboard/calendar', label: 'Calendrier', icon: <Calendar size={20} /> },
      { path: '/dashboard/profile', label: 'Mon profil', icon: <User size={20} /> },
    ];

    const parentItems = [
      ...commonItems,
      { path: '/dashboard/matching', label: 'Choisir un tuteur', icon: <Users size={20} /> },
      { path: '/dashboard/progress', label: 'Suivi des progrès', icon: <BarChart size={20} /> },
      { path: '/dashboard/profile', label: 'Mon profil', icon: <User size={20} /> },
    ];

    switch (userRole) {
      case 'student':
        return studentItems;
      case 'tutor':
        return tutorItems;
      case 'parent':
        return parentItems;
      default:
        return commonItems;
    }
  }, [userRole]);

  return (
    <div className="h-full w-72 bg-white shadow-xl overflow-y-auto">
      <div className="flex flex-col h-full">
        {/* Logo and close button */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-7 w-7 text-primary-600" />
            <span className="text-xl font-bold text-gray-800">MIABO</span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden rounded-full p-1 hover:bg-gray-100 transition"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  onClick={onClose}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Section divider */}
          <div className="my-6 border-t border-gray-200" />

          {/* Secondary navigation */}
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                onClick={onClose}
              >
                <Settings size={20} />
                <span className="font-medium">Paramètres</span>
              </NavLink>
            </li>
            {userRole === 'tutor' && (
              <li>
                <NavLink
                  to="/dashboard/certifications"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  onClick={onClose}
                >
                  <Award size={20} />
                  <span className="font-medium">Certifications</span>
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        {/* Help section */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-medium text-gray-700 mb-1">Besoin d'aide ?</h4>
            <p className="text-sm text-gray-500 mb-2">
              Consultez notre centre d'aide ou contactez notre support.
            </p>
            <a
              href="#"
              className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
            >
              <span>Centre d'aide</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
