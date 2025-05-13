import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, BarChart3, Clock, MessageSquare, User, BookOpen } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import StatCard from '../../components/dashboard/StatCard';
import ProgressChart from '../../components/dashboard/ProgressChart';

const ParentDashboard: React.FC = () => {
  const { user } = useUser();

  // Mock data for student progress charts
  const mathProgressData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    data: [65, 70, 68, 75, 82, 90],
  };

  const frenchProgressData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    data: [72, 75, 80, 78, 84, 88],
  };

  // Mock children data
  const children = [
    {
      id: '1',
      name: 'Soa Rakoto',
      avatar: 'https://i.pravatar.cc/150?img=33',
      grade: '2nde',
      subjects: ['Mathématiques', 'Physique', 'Français'],
      nextSession: 'Aujourd\'hui, 15h',
      tutors: [
        {
          name: 'Mathieu Randria',
          avatar: 'https://i.pravatar.cc/150?img=12',
          subject: 'Mathématiques',
        },
        {
          name: 'Clara Rabe',
          avatar: 'https://i.pravatar.cc/150?img=25',
          subject: 'Français',
        },
      ],
    },
  ];

  // Mock billing history
  const billingHistory = [
    {
      id: '1',
      date: '12 Mai 2023',
      description: 'Forfait 10 sessions - Mai 2023',
      amount: 250,
      status: 'paid',
    },
    {
      id: '2',
      date: '15 Avril 2023',
      description: 'Forfait 10 sessions - Avril 2023',
      amount: 250,
      status: 'paid',
    },
    {
      id: '3',
      date: '10 Juin 2023',
      description: 'Forfait 10 sessions - Juin 2023',
      amount: 250,
      status: 'upcoming',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Bonjour, {user?.name} 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Suivez la progression scolaire de votre enfant.
          </p>
        </div>
        <div>
          <button className="btn btn-primary">
            Réserver une session
          </button>
        </div>
      </div>

      {/* Child overview */}
      {children.map((child) => (
        <motion.div
          key={child.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center">
                <img 
                  src={child.avatar} 
                  alt={child.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{child.name}</h2>
                  <p className="text-gray-600">Classe de {child.grade}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {child.subjects.map((subject, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700">Prochaine session</h3>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 text-primary-600 mr-1" />
                  <p className="text-gray-800 font-medium">{child.nextSession}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Sessions ce mois"
          value="8"
          icon={<Calendar className="h-6 w-6 text-primary-600" />}
          change={{ value: '2', isPositive: true }}
        />
        <StatCard
          title="Budget mensuel"
          value="250 €"
          icon={<DollarSign className="h-6 w-6 text-accent-500" />}
        />
        <StatCard
          title="Messages non lus"
          value="3"
          icon={<MessageSquare className="h-6 w-6 text-warning-500" />}
        />
        <StatCard
          title="Heures réservées"
          value="12h"
          icon={<Clock className="h-6 w-6 text-secondary-500" />}
        />
      </div>

      {/* Progress charts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Progression académique</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProgressChart
            title="Mathématiques"
            data={mathProgressData.data}
            labels={mathProgressData.labels}
            color="#3B82F6"
          />
          <ProgressChart
            title="Français"
            data={frenchProgressData.data}
            labels={frenchProgressData.labels}
            color="#10B981"
          />
        </div>
      </div>

      {/* Tutors section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Tuteurs de votre enfant</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {children[0].tutors.map((tutor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 card-hover flex items-start space-x-4"
            >
              <img
                src={tutor.avatar}
                alt={tutor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{tutor.name}</h3>
                <p className="text-gray-600">Professeur de {tutor.subject}</p>
                <div className="mt-3 flex space-x-2">
                  <button className="btn btn-outline text-sm py-1.5 px-3 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </button>
                  <button className="btn btn-primary text-sm py-1.5 px-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Rendez-vous
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Billing history */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Historique de paiement</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {billingHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.amount} €
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.status === 'paid' 
                          ? 'bg-success-100 text-success-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status === 'paid' ? 'Payé' : 'À venir'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-primary-600 hover:text-primary-900">
                        {item.status === 'paid' ? 'Reçu' : 'Payer maintenant'}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 card-hover"
          >
            <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Ajouter un enfant</h3>
            <p className="text-gray-600 mb-4">
              Ajoutez un autre enfant à votre compte pour gérer tous vos enfants.
            </p>
            <a href="#" className="text-primary-600 font-medium flex items-center hover:text-primary-700">
              Ajouter maintenant
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 card-hover"
          >
            <div className="bg-secondary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-secondary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Trouver un tuteur</h3>
            <p className="text-gray-600 mb-4">
              Recherchez et contactez des tuteurs qualifiés pour votre enfant.
            </p>
            <a href="#" className="text-secondary-600 font-medium flex items-center hover:text-secondary-700">
              Rechercher
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 card-hover"
          >
            <div className="bg-accent-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Rapports détaillés</h3>
            <p className="text-gray-600 mb-4">
              Accédez à des rapports détaillés sur la progression de votre enfant.
            </p>
            <a href="#" className="text-accent-600 font-medium flex items-center hover:text-accent-700">
              Voir les rapports
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;