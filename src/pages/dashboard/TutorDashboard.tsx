import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, DollarSign, Calendar, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import StatCard from '../../components/dashboard/StatCard';
import ProgressChart from '../../components/dashboard/ProgressChart';

const TutorDashboard: React.FC = () => {
  const { user } = useUser();

  // Mock data for student sessions chart
  const sessionsData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    data: [3, 5, 2, 4, 3, 6, 1],
  };

  // Mock data for earnings chart
  const earningsData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    data: [150, 220, 180, 250, 300, 350],
  };

  // Mock upcoming student sessions
  const upcomingSessions = [
    {
      id: '1',
      studentName: 'Aina Rakoto',
      studentAvatar: 'https://i.pravatar.cc/150?img=5',
      subject: 'Mathématiques',
      topic: 'Équations du second degré',
      date: 'Aujourd\'hui',
      time: '15:00 - 16:30',
      status: 'upcoming',
    },
    {
      id: '2',
      studentName: 'Faniry Andria',
      studentAvatar: 'https://i.pravatar.cc/150?img=8',
      subject: 'Physique',
      topic: 'Mécanique des fluides',
      date: 'Demain',
      time: '10:00 - 11:30',
      status: 'upcoming',
    },
  ];

  // Mock student list
  const recentStudents = [
    {
      id: '1',
      name: 'Aina Rakoto',
      avatar: 'https://i.pravatar.cc/150?img=5',
      grade: '1ère',
      subjects: ['Mathématiques', 'Physique'],
      progress: 'Bon',
      lastSession: 'Il y a 2 jours',
    },
    {
      id: '2',
      name: 'Faniry Andria',
      avatar: 'https://i.pravatar.cc/150?img=8',
      grade: 'Terminale',
      subjects: ['Physique'],
      progress: 'Excellent',
      lastSession: 'Il y a 5 jours',
    },
    {
      id: '3',
      name: 'Tahiana Rabe',
      avatar: 'https://i.pravatar.cc/150?img=11',
      grade: '3ème',
      subjects: ['Mathématiques', 'SVT'],
      progress: 'À améliorer',
      lastSession: 'Hier',
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
            Voici un aperçu de votre activité de tutorat.
          </p>
        </div>
        <div>
          <button className="btn btn-primary">
            Créer une nouvelle session
          </button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Heures données"
          value="48h"
          icon={<Clock className="h-6 w-6 text-primary-600" />}
          change={{ value: '8h', isPositive: true }}
        />
        <StatCard
          title="Élèves actifs"
          value="12"
          icon={<Users className="h-6 w-6 text-secondary-500" />}
          change={{ value: '2', isPositive: true }}
        />
        <StatCard
          title="Revenus ce mois"
          value="750 €"
          icon={<DollarSign className="h-6 w-6 text-accent-500" />}
          change={{ value: '120 €', isPositive: true }}
        />
        <StatCard
          title="Session à venir"
          value="Aujourd'hui, 15h"
          icon={<Calendar className="h-6 w-6 text-success-500" />}
        />
      </div>

      {/* Performance charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart
          title="Sessions par jour"
          data={sessionsData.data}
          labels={sessionsData.labels}
          color="#10B981"
        />
        <ProgressChart
          title="Revenus mensuels (€)"
          data={earningsData.data}
          labels={earningsData.labels}
          color="#F97316"
        />
      </div>

      {/* Upcoming sessions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Sessions à venir</h2>
          <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Voir toutes les sessions
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingSessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden card-hover"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <img 
                    src={session.studentAvatar} 
                    alt={session.studentName} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-100"
                  />
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{session.subject}</h3>
                        <p className="text-gray-600">avec {session.studentName}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {session.date}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center text-sm text-gray-700">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{session.time}</span>
                    </div>
                    
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700">Sujet</h4>
                      <p className="text-sm text-gray-600">
                        {session.topic}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-3 flex justify-between">
                <button className="btn btn-outline text-sm py-1.5 px-3">
                  Reprogrammer
                </button>
                <button className="btn btn-primary text-sm py-1.5 px-3">
                  Démarrer la session
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent students */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Élèves récents</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Élève
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Classe
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matières
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progression
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dernière session
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={student.avatar} alt={student.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.grade}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {student.subjects.map((subject, index) => (
                          <span key={index} className="px-2 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {student.progress === 'Excellent' && (
                          <CheckCircle className="h-4 w-4 text-success-500 mr-1" />
                        )}
                        {student.progress === 'À améliorer' && (
                          <AlertCircle className="h-4 w-4 text-warning-500 mr-1" />
                        )}
                        <span 
                          className={`text-sm ${
                            student.progress === 'Excellent' 
                              ? 'text-success-700' 
                              : student.progress === 'À améliorer'
                                ? 'text-warning-700'
                                : 'text-gray-900'
                          }`}
                        >
                          {student.progress}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.lastSession}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-primary-600 hover:text-primary-900 mr-3">
                        Suivi
                      </a>
                      <a href="#" className="text-primary-600 hover:text-primary-900">
                        Message
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Resources and Tools */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Ressources pour les tuteurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 card-hover"
          >
            <div className="bg-secondary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-secondary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Outils de plan de cours</h3>
            <p className="text-gray-600 mb-4">
              Créez facilement des plans de cours structurés pour vos élèves.
            </p>
            <a href="#" className="text-secondary-600 font-medium flex items-center hover:text-secondary-700">
              Accéder aux outils
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 card-hover"
          >
            <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Gestion du calendrier</h3>
            <p className="text-gray-600 mb-4">
              Organisez vos disponibilités et vos sessions de tutorat.
            </p>
            <a href="#" className="text-primary-600 font-medium flex items-center hover:text-primary-700">
              Gérer mon calendrier
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 card-hover"
          >
            <div className="bg-accent-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="h-6 w-6 text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Suivi des paiements</h3>
            <p className="text-gray-600 mb-4">
              Consultez votre historique de paiements et vos revenus.
            </p>
            <a href="#" className="text-accent-600 font-medium flex items-center hover:text-accent-700">
              Voir mes paiements
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;