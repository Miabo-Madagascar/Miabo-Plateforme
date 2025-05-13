import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, CheckCircle, Calendar, Award, Brain, BookMarked } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import StatCard from '../../components/dashboard/StatCard';
import ProgressChart from '../../components/dashboard/ProgressChart';
import TutorCard from '../../components/dashboard/TutorCard';
import LearningStyleCard from '../../components/dashboard/LearningStyleCard';

const StudentDashboard: React.FC = () => {
  const { user } = useUser();

  // Mock data for progress charts
  const mathProgressData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    data: [65, 70, 68, 75, 82, 90],
  };

  const frenchProgressData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    data: [72, 75, 80, 78, 84, 88],
  };

  // Mock tutor data
  const tutors = [
    {
      id: '1',
      name: 'Mathieu Randria',
      avatar: 'https://i.pravatar.cc/300?img=12',
      rating: 4.8,
      reviewCount: 124,
      location: 'Antananarivo',
      subjects: ['Mathématiques', 'Physique'],
      experience: '5 ans',
      bio: 'Professeur de mathématiques passionné, spécialisé dans la préparation aux examens nationaux.',
      hourlyRate: 15,
      matchPercentage: 95,
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
            Bienvenue sur votre tableau de bord. Voici votre progression.
          </p>
        </div>
        <div>
          <button className="btn btn-primary">
            Réserver une session
          </button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Heures de tutorat"
          value="24h"
          icon={<Clock className="h-6 w-6 text-primary-600" />}
          change={{ value: '3h', isPositive: true }}
        />
        <StatCard
          title="Cours complétés"
          value="12"
          icon={<CheckCircle className="h-6 w-6 text-success-500" />}
          change={{ value: '2', isPositive: true }}
        />
        <StatCard
          title="Matières suivies"
          value="3"
          icon={<BookOpen className="h-6 w-6 text-accent-500" />}
        />
        <StatCard
          title="Prochaine session"
          value="Demain, 15h"
          icon={<Calendar className="h-6 w-6 text-secondary-500" />}
        />
      </div>

      {/* Progress charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart
          title="Progrès en Mathématiques"
          data={mathProgressData.data}
          labels={mathProgressData.labels}
          color="#3B82F6"
        />
        <ProgressChart
          title="Progrès en Français"
          data={frenchProgressData.data}
          labels={frenchProgressData.labels}
          color="#10B981"
        />
      </div>

      {/* Learning style */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Votre style d'apprentissage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LearningStyleCard
            title="Visuel"
            description="Vous apprenez mieux avec des images, des graphiques et des représentations visuelles."
            percentage={85}
            icon={<BookMarked className="h-6 w-6 text-primary-600" />}
            color="bg-primary-500"
          />
          <LearningStyleCard
            title="Auditif"
            description="Vous assimilez les informations par l'écoute et la discussion."
            percentage={60}
            icon={<Brain className="h-6 w-6 text-secondary-600" />}
            color="bg-secondary-500"
          />
          <LearningStyleCard
            title="Kinesthésique"
            description="Vous apprenez mieux par l'expérience pratique et l'engagement physique."
            percentage={40}
            icon={<Award className="h-6 w-6 text-accent-600" />}
            color="bg-accent-500"
          />
        </div>
      </div>

      {/* Recommended tutors */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tuteur recommandé</h2>
          <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Voir tous les tuteurs
          </a>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {tutors.map((tutor) => (
            <TutorCard key={tutor.id} {...tutor} />
          ))}
        </div>
      </div>

      {/* Upcoming sessions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Sessions à venir</h2>
          <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Voir toutes les sessions
          </a>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 rounded-lg p-3">
                <Calendar className="h-6 w-6 text-primary-600" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Session de Mathématiques</h3>
                    <p className="text-gray-600">Avec Mathieu Randria</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Demain
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center text-sm text-gray-700">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>15:00 - 16:30</span>
                  <span className="mx-2">•</span>
                  <span>Durée: 1h30</span>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Sujet</h4>
                  <p className="text-sm text-gray-600">
                    Révision des équations différentielles et préparation à l'examen de fin de trimestre.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
            <div className="flex space-x-2">
              <button className="btn btn-outline text-sm py-1.5 px-3">
                Annuler
              </button>
              <button className="btn btn-outline text-sm py-1.5 px-3">
                Reprogrammer
              </button>
            </div>
            <button className="btn btn-primary text-sm py-1.5 px-3">
              Rejoindre la session
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;