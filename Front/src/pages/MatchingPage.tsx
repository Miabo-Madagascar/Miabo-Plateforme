import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, CheckCircle, BookOpen, MapPin, Clock, Users, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';
import TutorCard from '../components/dashboard/TutorCard';

const MatchingPage: React.FC = () => {
  const { user } = useUser();
  const [filterOpen, setFilterOpen] = useState(false);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [availabilities, setAvailabilities] = useState<string[]>([]);
  const [learningStyle, setLearningStyle] = useState<string[]>([]);
  const [grade, setGrade] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for tutors
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
      availability: ['Lundi après-midi', 'Mercredi matin', 'Vendredi soir'],
      matchPercentage: 95,
    },
    {
      id: '2',
      name: 'Clara Rabe',
      avatar: 'https://i.pravatar.cc/300?img=25',
      rating: 4.6,
      reviewCount: 89,
      location: 'Antananarivo',
      subjects: ['Français', 'Histoire'],
      experience: '3 ans',
      bio: 'Passionnée de littérature et d\'histoire, j\'aide les élèves à développer leur esprit critique et leur expression écrite.',
      hourlyRate: 12,
      availability: ['Mardi après-midi', 'Jeudi soir', 'Samedi matin'],
      matchPercentage: 87,
    },
    {
      id: '3',
      name: 'Thomas Razafindrakoto',
      avatar: 'https://i.pravatar.cc/300?img=18',
      rating: 4.9,
      reviewCount: 156,
      location: 'Antananarivo',
      subjects: ['Anglais', 'Allemand'],
      experience: '7 ans',
      bio: 'Bilingue anglais et allemand, j\'ai vécu plusieurs années à l\'étranger et j\'utilise des méthodes modernes pour enseigner les langues.',
      hourlyRate: 18,
      availability: ['Lundi soir', 'Mercredi après-midi', 'Samedi'],
      matchPercentage: 82,
    },
    {
      id: '4',
      name: 'Soa Andriamahefa',
      avatar: 'https://i.pravatar.cc/300?img=32',
      rating: 4.7,
      reviewCount: 93,
      location: 'Ambatondrazaka',
      subjects: ['Mathématiques', 'SVT'],
      experience: '4 ans',
      bio: 'Ingénieure de formation, j\'adore transmettre ma passion pour les sciences et les mathématiques à mes élèves.',
      hourlyRate: 14,
      availability: ['Mardi matin', 'Jeudi après-midi', 'Dimanche'],
      matchPercentage: 78,
    },
  ];

  // Filter tutors based on selected criteria
  const filteredTutors = tutors.filter((tutor) => {
    // Search term filter
    if (searchTerm && !tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !tutor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    // Subject filter
    if (subjects.length > 0 && !tutor.subjects.some(subject => subjects.includes(subject))) {
      return false;
    }
    
    // Availability filter
    if (availabilities.length > 0 && !tutor.availability?.some(avail => 
        availabilities.some(a => avail.toLowerCase().includes(a.toLowerCase())))) {
      return false;
    }
    
    return true;
  });

  // Toggle a filter value in a filter array
  const toggleFilter = (value: string, filterArray: string[], setFilterArray: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (filterArray.includes(value)) {
      setFilterArray(filterArray.filter(v => v !== value));
    } else {
      setFilterArray([...filterArray, value]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Trouvez le tuteur idéal
        </h1>
        <p className="text-gray-600 mt-1">
          Notre système de matching IA vous aide à trouver le tuteur qui correspond le mieux à votre style d'apprentissage.
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher par nom ou matière..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="btn btn-outline flex items-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </button>
      </div>

      {/* Extended filters */}
      {filterOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Subjects */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Matières</h3>
              <div className="space-y-2">
                {['Mathématiques', 'Français', 'Anglais', 'Physique', 'SVT', 'Histoire'].map((subject) => (
                  <div key={subject} className="flex items-center">
                    <input
                      id={`subject-${subject}`}
                      type="checkbox"
                      checked={subjects.includes(subject)}
                      onChange={() => toggleFilter(subject, subjects, setSubjects)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`subject-${subject}`} className="ml-2 text-sm text-gray-700">
                      {subject}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Disponibilité</h3>
              <div className="space-y-2">
                {['Matin', 'Après-midi', 'Soir', 'Week-end'].map((time) => (
                  <div key={time} className="flex items-center">
                    <input
                      id={`time-${time}`}
                      type="checkbox"
                      checked={availabilities.includes(time)}
                      onChange={() => toggleFilter(time, availabilities, setAvailabilities)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`time-${time}`} className="ml-2 text-sm text-gray-700">
                      {time}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning styles */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Style d'apprentissage</h3>
              <div className="space-y-2">
                {['Visuel', 'Auditif', 'Kinesthésique'].map((style) => (
                  <div key={style} className="flex items-center">
                    <input
                      id={`style-${style}`}
                      type="checkbox"
                      checked={learningStyle.includes(style)}
                      onChange={() => toggleFilter(style, learningStyle, setLearningStyle)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`style-${style}`} className="ml-2 text-sm text-gray-700">
                      {style}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Grade/Level */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Niveau scolaire</h3>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="input"
              >
                <option value="">Tous les niveaux</option>
                <option value="primaire">Primaire</option>
                <option value="college">Collège</option>
                <option value="lycee">Lycée</option>
                <option value="superieur">Enseignement supérieur</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setSubjects([]);
                setAvailabilities([]);
                setLearningStyle([]);
                setGrade('');
                setSearchTerm('');
              }}
              className="btn btn-outline"
            >
              Réinitialiser
            </button>
            <button 
              onClick={() => setFilterOpen(false)}
              className="btn btn-primary"
            >
              Appliquer les filtres
            </button>
          </div>
        </motion.div>
      )}

      {/* Matching advantages */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Avantages de notre système de matching</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex space-x-3">
            <div className="bg-primary-100 rounded-lg p-2 h-fit">
              <BookOpen className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium">Style d'apprentissage</h3>
              <p className="text-sm text-gray-600">
                Correspond à votre façon d'apprendre et d'assimiler les connaissances.
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="bg-secondary-100 rounded-lg p-2 h-fit">
              <MapPin className="h-5 w-5 text-secondary-600" />
            </div>
            <div>
              <h3 className="font-medium">Proximité géographique</h3>
              <p className="text-sm text-gray-600">
                Trouve des tuteurs proches de chez vous pour faciliter les rencontres.
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="bg-accent-100 rounded-lg p-2 h-fit">
              <Clock className="h-5 w-5 text-accent-600" />
            </div>
            <div>
              <h3 className="font-medium">Compatibilité des horaires</h3>
              <p className="text-sm text-gray-600">
                Suggère des tuteurs disponibles aux moments qui vous conviennent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tutors list */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tuteurs suggérés pour vous</h2>
          <span className="text-sm text-gray-600">{filteredTutors.length} tuteurs trouvés</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTutors.map((tutor) => (
            <TutorCard key={tutor.id} {...tutor} />
          ))}
        </div>
      </div>

      {/* Matching process */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Comment fonctionne notre système de matching</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-primary-600 flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-medium">Test de style d'apprentissage</h3>
              <p className="text-sm text-gray-600">
                Passez notre test pour découvrir votre façon d'apprendre (visuel, auditif, kinesthésique, etc.).
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-primary-600 flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-medium">Définition des objectifs</h3>
              <p className="text-sm text-gray-600">
                Précisez vos objectifs d'apprentissage, les matières qui vous intéressent et votre niveau actuel.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-primary-600 flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-medium">Matching IA</h3>
              <p className="text-sm text-gray-600">
                Notre algorithme analyse ces données et les compare avec les profils des tuteurs pour trouver les correspondances idéales.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-primary-600 flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="font-medium">Proposition de tuteurs</h3>
              <p className="text-sm text-gray-600">
                Recevez une liste de tuteurs recommandés avec un pourcentage de compatibilité pour chacun.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="btn btn-primary">
            Passer le test de style d'apprentissage
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchingPage;