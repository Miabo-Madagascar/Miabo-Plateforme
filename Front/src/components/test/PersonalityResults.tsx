import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, Heart, Star, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';
import type { PersonalityResults as PersonalityResultsType } from './PersonalityTest';

interface PersonalityResultsProps {
  results: PersonalityResultsType;
  onRestart: () => void;
}

const PersonalityResults: React.FC<PersonalityResultsProps> = ({ results, onRestart }) => {
  const navigate = useNavigate();

  const handleFindTutors = () => {
    navigate('/dashboard/matching');
  };

  const getTraitDescription = (trait: string, score: number) => {
    switch (trait) {
      case 'extraversion':
        return score > 50 
          ? "Vous êtes sociable et énergisé(e) par les interactions sociales."
          : "Vous êtes réfléchi(e) et appréciez les moments de solitude.";
      case 'openness':
        return score > 50
          ? "Vous êtes curieux(se) et ouvert(e) aux nouvelles expériences."
          : "Vous êtes pragmatique et appréciez la stabilité.";
      case 'conscientiousness':
        return score > 50
          ? "Vous êtes organisé(e) et méthodique dans votre approche."
          : "Vous êtes flexible et spontané(e) dans votre approche.";
      case 'agreeableness':
        return score > 50
          ? "Vous êtes empathique et orienté(e) vers les autres."
          : "Vous êtes direct(e) et orienté(e) vers les objectifs.";
      default:
        return "";
    }
  };

  const getTraitIcon = (trait: string) => {
    switch (trait) {
      case 'extraversion':
        return <Star className="h-5 w-5" />;
      case 'openness':
        return <Lightbulb className="h-5 w-5" />;
      case 'conscientiousness':
        return <Brain className="h-5 w-5" />;
      case 'agreeableness':
        return <Heart className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getTraitColor = (trait: string) => {
    switch (trait) {
      case 'extraversion':
        return 'bg-yellow-100 text-yellow-600';
      case 'openness':
        return 'bg-blue-100 text-blue-600';
      case 'conscientiousness':
        return 'bg-purple-100 text-purple-600';
      case 'agreeableness':
        return 'bg-pink-100 text-pink-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPersonnality = (trait: string) => {
    switch (trait) {
      case 'extraversion':
        return 'Extraversion';
      case 'openness':
        return 'Ouverture';
      case 'conscientiousness':
        return 'Conscience';
      case 'agreeableness':
        return 'Agréabilité';
      default:
        return 'Rien';
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-success-100 mb-4">
          <CheckCircle2 className="h-6 w-6 text-success-600" />
        </div>
        <h2 className="text-2xl font-bold">Votre profil de personnalité</h2>
        <p className="text-gray-600 mt-2">
          Basé sur vos réponses, voici une analyse de vos traits de personnalité dominants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {Object.entries(results).map(([trait, score]) => (
          <div key={trait} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className={`${getTraitColor(trait)} p-2 rounded-full mr-3`}>
                  {getTraitIcon(trait)}
                </div>
                <h4 className="font-medium capitalize">
                  {getPersonnality(trait)}
                </h4>
              </div>
              <span className="text-lg font-bold">{score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
              <div 
                className={`h-2.5 rounded-full ${
                  trait === 'extraversion' ? 'bg-yellow-500' :
                  trait === 'openness' ? 'bg-blue-500' :
                  trait === 'conscientiousness' ? 'bg-purple-500' :
                  'bg-pink-500'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              {getTraitDescription(trait, score)}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-primary-50 rounded-lg p-5 border border-primary-100 mb-8">
        <h3 className="flex items-center font-medium text-primary-800 mb-3">
          <Lightbulb className="h-5 w-5 mr-2 text-primary-600" />
          Comment utiliser ces résultats
        </h3>
        <ul className="text-sm text-primary-700 space-y-2">
          <li className="flex items-start">
            <span className="h-5 w-5 inline-flex items-center justify-center text-primary-600 mr-2">•</span>
            Identifiez vos points forts et domaines de développement
          </li>
          <li className="flex items-start">
            <span className="h-5 w-5 inline-flex items-center justify-center text-primary-600 mr-2">•</span>
            Adaptez votre approche d'apprentissage à votre personnalité
          </li>
          <li className="flex items-start">
            <span className="h-5 w-5 inline-flex items-center justify-center text-primary-600 mr-2">•</span>
            Communiquez plus efficacement avec vos tuteurs
          </li>
        </ul>
      </div>

      <div className="flex justify-between">
        <button 
          onClick={onRestart}
          className="btn btn-outline"
        >
          Refaire le test
        </button>
        <button 
          onClick={handleFindTutors}
          className="btn btn-primary flex items-center"
        >
          Trouver des tuteurs compatibles
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default PersonalityResults;