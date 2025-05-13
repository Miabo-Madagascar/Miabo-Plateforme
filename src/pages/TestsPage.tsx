import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Eye, Music, Activity, Calendar, CheckCircle2, ArrowRight, Book, Lightbulb, Layers } from 'lucide-react';

const TestsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('learning');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  // Mock learning style questions
  const learningStyleQuestions = [
    {
      question: "Lorsque vous apprenez une nouvelle compétence, vous préférez :",
      options: [
        "Regarder des démonstrations visuelles ou des vidéos",
        "Écouter des explications détaillées",
        "Essayer vous-même et apprendre par la pratique",
        "Suivre un manuel étape par étape"
      ]
    },
    {
      question: "Pour comprendre un concept difficile, vous :",
      options: [
        "Dessinez un schéma ou un diagramme",
        "Discutez du concept avec quelqu'un d'autre",
        "Manipulez des objets ou faites des simulations",
        "Lisez des explications détaillées dans un livre"
      ]
    },
    {
      question: "Lorsque vous vous souvenez d'un événement, vous vous rappelez principalement :",
      options: [
        "De ce que vous avez vu",
        "De ce que les gens ont dit",
        "De ce que vous avez fait et ressenti",
        "Des détails et de l'ordre chronologique"
      ]
    },
    {
      question: "Dans une classe, vous apprenez mieux quand :",
      options: [
        "Le professeur utilise des présentations, des cartes et des illustrations",
        "Le professeur donne des cours magistraux et encourage les discussions",
        "Le professeur propose des activités pratiques et des expériences",
        "Le professeur fournit des documents écrits et des listes"
      ]
    },
    {
      question: "Lorsque vous devez mémoriser quelque chose, vous :",
      options: [
        "Créez des images mentales",
        "Répétez à haute voix ou utilisez des rimes",
        "Associez l'information à des mouvements ou des sensations",
        "Écrivez l'information plusieurs fois"
      ]
    }
  ];

  // Handle answering a question
  const handleAnswer = (answerIndex: number) => {
    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    // Move to next question or complete test
    if (currentQuestion < learningStyleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Test completed
      setTestCompleted(true);
    }
  };

  // Start the test
  const startTest = () => {
    setTestStarted(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setTestCompleted(false);
  };

  // Reset the test
  const resetTest = () => {
    setTestStarted(false);
    setTestCompleted(false);
    setCurrentQuestion(0);
    setAnswers([]);
  };

  // Calculate learning style results (mock implementation)
  const calculateResults = () => {
    // Count type of answers
    const visualCount = answers.filter(a => a === 0).length;
    const auditiveCount = answers.filter(a => a === 1).length;
    const kinestheticCount = answers.filter(a => a === 2).length;
    const readWriteCount = answers.filter(a => a === 3).length;
    
    const total = learningStyleQuestions.length;
    
    return {
      visual: Math.round((visualCount / total) * 100),
      auditive: Math.round((auditiveCount / total) * 100),
      kinesthetic: Math.round((kinestheticCount / total) * 100),
      readWrite: Math.round((readWriteCount / total) * 100),
    };
  };

  // Learning style results
  const results = testCompleted ? calculateResults() : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Tests et évaluations
        </h1>
        <p className="text-gray-600 mt-1">
          Découvrez votre style d'apprentissage et vos points forts pour un apprentissage personnalisé.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button 
              onClick={() => setActiveTab('learning')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'learning'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Styles d'apprentissage
            </button>
            <button 
              onClick={() => setActiveTab('personality')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'personality'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Profil de personnalité
            </button>
            <button 
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'skills'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Évaluation des compétences
            </button>
          </div>
        </div>

        {/* Test content */}
        <div className="p-6">
          {activeTab === 'learning' && (
            <div>
              {!testStarted && !testCompleted ? (
                // Test introduction
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-xl font-semibold mb-4">Test de style d'apprentissage</h2>
                  <p className="text-gray-600 mb-6">
                    Ce test vous aidera à découvrir comment vous assimilez et traitez l'information. 
                    Comprendre votre style d'apprentissage vous permettra d'adopter des méthodes d'études plus efficaces et de mieux communiquer avec vos tuteurs.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
                      <div className="bg-primary-100 p-2 rounded-full">
                        <Eye className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Style Visuel</h3>
                        <p className="text-sm text-gray-600">
                          Vous apprenez mieux par l'observation, les images et les démonstrations visuelles.
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
                      <div className="bg-secondary-100 p-2 rounded-full">
                        <Music className="h-5 w-5 text-secondary-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Style Auditif</h3>
                        <p className="text-sm text-gray-600">
                          Vous apprenez mieux en écoutant des explications et en participant à des discussions.
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
                      <div className="bg-accent-100 p-2 rounded-full">
                        <Activity className="h-5 w-5 text-accent-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Style Kinesthésique</h3>
                        <p className="text-sm text-gray-600">
                          Vous apprenez mieux par l'expérience, la pratique et l'engagement physique.
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
                      <div className="bg-gray-200 p-2 rounded-full">
                        <Book className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Style Lecture/Écriture</h3>
                        <p className="text-sm text-gray-600">
                          Vous apprenez mieux en lisant et en écrivant des informations.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary-50 rounded-lg p-5 border border-primary-100 mb-8">
                    <h3 className="flex items-center font-medium text-primary-800 mb-2">
                      <Lightbulb className="h-5 w-5 mr-2 text-primary-600" />
                      Important à savoir
                    </h3>
                    <ul className="text-sm text-primary-700 space-y-2">
                      <li className="flex items-start">
                        <span className="h-5 w-5 inline-flex items-center justify-center text-primary-600 mr-2">•</span>
                        Le test prend environ 5 minutes à compléter.
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 inline-flex items-center justify-center text-primary-600 mr-2">•</span>
                        Il n'y a pas de bonnes ou mauvaises réponses - répondez honnêtement selon vos préférences.
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 inline-flex items-center justify-center text-primary-600 mr-2">•</span>
                        Les résultats vous aideront à trouver des tuteurs compatibles avec votre style d'apprentissage.
                      </li>
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <button 
                      onClick={startTest}
                      className="btn btn-primary"
                    >
                      Commencer le test
                    </button>
                  </div>
                </div>
              ) : testStarted && !testCompleted ? (
                // Taking the test
                <div>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-500">
                        Question {currentQuestion + 1} / {learningStyleQuestions.length}
                      </span>
                      <button 
                        onClick={resetTest}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Abandonner
                      </button>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${((currentQuestion + 1) / learningStyleQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-semibold mb-6">
                      {learningStyleQuestions[currentQuestion].question}
                    </h2>
                    
                    <div className="space-y-3">
                      {learningStyleQuestions[currentQuestion].options.map((option, index) => (
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
              ) : (
                // Test results
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-success-100 mb-4">
                      <CheckCircle2 className="h-6 w-6 text-success-600" />
                    </div>
                    <h2 className="text-2xl font-bold">Test complété !</h2>
                    <p className="text-gray-600 mt-2">
                      Voici les résultats de votre test de style d'apprentissage.
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Votre profil d'apprentissage</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="bg-primary-100 p-2 rounded-full mr-3">
                              <Eye className="h-5 w-5 text-primary-600" />
                            </div>
                            <h4 className="font-medium">Visuel</h4>
                          </div>
                          <span className="text-lg font-bold">{results?.visual}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                          <div 
                            className="bg-primary-600 h-2.5 rounded-full" 
                            style={{ width: `${results?.visual}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600">
                          Vous assimilez bien l'information présentée visuellement à travers des images, des graphiques et des démonstrations.
                        </p>
                      </div>
                      
                      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="bg-secondary-100 p-2 rounded-full mr-3">
                              <Music className="h-5 w-5 text-secondary-600" />
                            </div>
                            <h4 className="font-medium">Auditif</h4>
                          </div>
                          <span className="text-lg font-bold">{results?.auditive}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                          <div 
                            className="bg-secondary-600 h-2.5 rounded-full" 
                            style={{ width: `${results?.auditive}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600">
                          Vous apprenez bien en écoutant des explications et en participant à des discussions et des débats.
                        </p>
                      </div>
                      
                      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="bg-accent-100 p-2 rounded-full mr-3">
                              <Activity className="h-5 w-5 text-accent-600" />
                            </div>
                            <h4 className="font-medium">Kinesthésique</h4>
                          </div>
                          <span className="text-lg font-bold">{results?.kinesthetic}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                          <div 
                            className="bg-accent-600 h-2.5 rounded-full" 
                            style={{ width: `${results?.kinesthetic}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600">
                          Vous apprenez mieux par l'expérience pratique, en manipulant des objets ou en étant physiquement impliqué.
                        </p>
                      </div>
                      
                      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="bg-gray-200 p-2 rounded-full mr-3">
                              <Book className="h-5 w-5 text-gray-600" />
                            </div>
                            <h4 className="font-medium">Lecture/Écriture</h4>
                          </div>
                          <span className="text-lg font-bold">{results?.readWrite}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                          <div 
                            className="bg-gray-600 h-2.5 rounded-full" 
                            style={{ width: `${results?.readWrite}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600">
                          Vous préférez apprendre par la lecture et l'écriture, en utilisant des listes et en prenant des notes.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary-50 rounded-lg p-5 border border-primary-100 mb-8">
                    <h3 className="flex items-center font-medium text-primary-800 mb-3">
                      <Lightbulb className="h-5 w-5 mr-2 text-primary-600" />
                      Recommandations personnalisées
                    </h3>
                    <p className="text-sm text-primary-700 mb-4">
                      Basé sur votre profil d'apprentissage, voici quelques conseils pour maximiser votre apprentissage :
                    </p>
                    <ul className="text-sm text-primary-700 space-y-2">
                      {results?.visual && results.visual >= 30 && (
                        <li className="flex items-start">
                          <span className="h-5 w-5 inline-flex items-center justify-center text-primary-600 mr-2">•</span>
                          Utilisez des cartes mentales, des graphiques et des codes couleur pour organiser l'information.
                        </li>
                      )}
                      {results?.auditive && results.auditive >= 30 && (
                        <li className="flex items-start">
                          <span className="h-5 w-5 inline-flex items-center justify-center text-primary-600 mr-2">•</span>
                          Participez à des discussions et expliquez les concepts à voix haute pour mieux les mémoriser.
                        </li>
                      )}
                      {results?.kinesthetic && results.kinesthetic >= 30 && (
                        <li className="flex items-start">
                          <span className="h-5 w-5 inline-flex items-center justify-center text-primary-600 mr-2">•</span>
                          Apprenez en faisant des expériences pratiques et en créant des simulations des concepts.
                        </li>
                      )}
                      {results?.readWrite && results.readWrite >= 30 && (
                        <li className="flex items-start">
                          <span className="h-5 w-5 inline-flex items-center justify-center text-primary-600 mr-2">•</span>
                          Prenez des notes détaillées et réécrivez les concepts clés pour les mémoriser.
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between">
                    <button 
                      onClick={resetTest}
                      className="btn btn-outline"
                    >
                      Refaire le test
                    </button>
                    <button 
                      onClick={() => {}}
                      className="btn btn-primary flex items-center"
                    >
                      Trouver des tuteurs compatibles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'personality' && (
            <div className="text-center p-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-4">
                <Brain className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Test de personnalité</h3>
              <p className="text-gray-500 mb-6 max-w-lg mx-auto">
                Découvrez votre profil de personnalité pour mieux comprendre vos forces et vos domaines de développement.
              </p>
              <button className="btn btn-primary">
                Commencer le test
              </button>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="text-center p-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-4">
                <Layers className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Évaluation des compétences</h3>
              <p className="text-gray-500 mb-6 max-w-lg mx-auto">
                Évaluez vos compétences actuelles dans différentes matières pour identifier vos points forts et vos besoins.
              </p>
              <button className="btn btn-primary">
                Commencer l'évaluation
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming tests */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Tests programmés</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-start space-x-4">
            <div className="bg-accent-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-accent-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Évaluation trimestrielle - Mathématiques</h3>
                <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">À venir</span>
              </div>
              <p className="text-gray-600 mt-1">Prévu pour le 15 juin 2023</p>
              <p className="text-sm text-gray-500 mt-3">
                Cette évaluation vous aidera à mesurer votre progression en mathématiques ce trimestre.
              </p>
              <button className="mt-4 text-sm text-primary-600 font-medium hover:text-primary-700">
                Voir les détails
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestsPage;