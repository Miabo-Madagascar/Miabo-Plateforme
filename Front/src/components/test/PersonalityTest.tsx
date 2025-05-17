import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PersonalityTestProps {
  onComplete: (results: PersonalityResults) => void;
  onBack: () => void;
}

export interface PersonalityResults {
  extraversion: number;
  openness: number;
  conscientiousness: number;
  agreeableness: number;
}

const PersonalityTest: React.FC<PersonalityTestProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    {
      question: "Comment vous comportez-vous dans un groupe ?",
      options: [
        "Je préfère écouter et observer",
        "Je participe modérément aux discussions",
        "Je prends souvent l'initiative des conversations",
        "Je suis naturellement le centre d'attention"
      ]
    },
    {
      question: "Face à un nouveau défi, vous avez tendance à :",
      options: [
        "Suivre une approche éprouvée et méthodique",
        "Analyser toutes les options avant d'agir",
        "Essayer de nouvelles approches créatives",
        "Improviser et m'adapter au fur et à mesure"
      ]
    },
    {
      question: "Dans votre travail ou vos études, vous êtes plutôt :",
      options: [
        "Très organisé(e) et méthodique",
        "Équilibré(e) entre organisation et flexibilité",
        "Adaptable selon les circonstances",
        "Spontané(e) et créatif(ve)"
      ]
    },
    {
      question: "Comment gérez-vous les conflits ?",
      options: [
        "J'évite les confrontations",
        "Je cherche un compromis",
        "Je défends fermement mon point de vue",
        "Je cherche à comprendre tous les points de vue"
      ]
    },
    {
      question: "Face à un changement inattendu, vous :",
      options: [
        "Préférez maintenir vos habitudes",
        "Vous adaptez progressivement",
        "Voyez une opportunité d'apprentissage",
        "Embrassez le changement avec enthousiasme"
      ]
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate results
      const results = calculateResults(newAnswers);
      onComplete(results);
    }
  };

  const calculateResults = (answers: number[]): PersonalityResults => {
    // Simple calculation for demonstration
    // In a real app, this would be more sophisticated
    return {
      extraversion: Math.round((answers.filter(a => a === 2 || a === 3).length / answers.length) * 100),
      openness: Math.round((answers.filter(a => a === 2 || a === 3).length / answers.length) * 100),
      conscientiousness: Math.round((answers.filter(a => a === 0 || a === 1).length / answers.length) * 100),
      agreeableness: Math.round((answers.filter(a => a === 1 || a === 3).length / answers.length) * 100),
    };
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestion + 1} / {questions.length}
          </span>
          <button 
            onClick={onBack}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Abandonner
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-6">
          {questions[currentQuestion].question}
        </h2>
        
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full text-left p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="flex items-start">
                <span className="h-6 w-6 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 mr-3 font-medium text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PersonalityTest;