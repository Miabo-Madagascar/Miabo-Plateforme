import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Video, Clock, Award, 
  CheckCircle, FileCheck, Download, 
  PlusCircle, Play, MessageCircle,
  Users, Star, BadgeCheck
} from 'lucide-react';

const TutorTrainingPage: React.FC = () => {
  const [activeModule, setActiveModule] = useState(0);

  // Mock training modules data
  const trainingModules = [
    {
      id: 1,
      title: "Introduction à la pédagogie",
      description: "Fondamentaux de l'enseignement et principes pédagogiques",
      progress: 100,
      status: "completed",
      duration: "2h 30min",
      resources: [
        {
          title: "Les bases de la pédagogie moderne",
          type: "video",
          duration: "45min",
          completed: true
        },
        {
          title: "Comprendre les styles d'apprentissage",
          type: "video",
          duration: "35min",
          completed: true
        },
        {
          title: "Techniques d'engagement des élèves",
          type: "pdf",
          pages: 12,
          completed: true
        },
        {
          title: "Quiz d'évaluation",
          type: "quiz",
          questions: 20,
          completed: true
        }
      ]
    },
    {
      id: 2,
      title: "Méthodes d'enseignement efficaces",
      description: "Stratégies et techniques pour maximiser l'apprentissage",
      progress: 60,
      status: "in-progress",
      duration: "3h 15min",
      resources: [
        {
          title: "Techniques d'explication adaptées",
          type: "video",
          duration: "50min",
          completed: true
        },
        {
          title: "Pédagogie différenciée",
          type: "video",
          duration: "40min",
          completed: true
        },
        {
          title: "Gestion de groupes hétérogènes",
          type: "pdf",
          pages: 15,
          completed: false
        },
        {
          title: "Exercices pratiques",
          type: "exercise",
          count: 5,
          completed: false
        },
        {
          title: "Quiz d'évaluation",
          type: "quiz",
          questions: 15,
          completed: false
        }
      ]
    },
    {
      id: 3,
      title: "Évaluation et suivi des progrès",
      description: "Outils et méthodes pour évaluer efficacement les élèves",
      progress: 0,
      status: "locked",
      duration: "2h 45min",
      resources: [
        {
          title: "Principes d'évaluation formative",
          type: "video",
          duration: "40min",
          completed: false
        },
        {
          title: "Création de tests efficaces",
          type: "video",
          duration: "35min",
          completed: false
        },
        {
          title: "Analyse des résultats d'évaluation",
          type: "pdf",
          pages: 10,
          completed: false
        },
        {
          title: "Suivi des progrès avec MIABO",
          type: "tutorial",
          duration: "25min",
          completed: false
        },
        {
          title: "Quiz d'évaluation",
          type: "quiz",
          questions: 18,
          completed: false
        }
      ]
    },
    {
      id: 4,
      title: "Communication avec les parents",
      description: "Stratégies pour une collaboration efficace avec les parents",
      progress: 0,
      status: "locked",
      duration: "2h",
      resources: [
        {
          title: "Principes de communication efficace",
          type: "video",
          duration: "30min",
          completed: false
        },
        {
          title: "Gestion des situations délicates",
          type: "video",
          duration: "40min",
          completed: false
        },
        {
          title: "Modèles de rapports pour parents",
          type: "templates",
          count: 5,
          completed: false
        },
        {
          title: "Quiz d'évaluation",
          type: "quiz",
          questions: 12,
          completed: false
        }
      ]
    }
  ];

  // Get icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'pdf':
        return <FileCheck className="h-4 w-4" />;
      case 'quiz':
        return <CheckCircle className="h-4 w-4" />;
      case 'exercise':
        return <PlusCircle className="h-4 w-4" />;
      case 'tutorial':
        return <Play className="h-4 w-4" />;
      case 'templates':
        return <Download className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Espace de formation des tuteurs
        </h1>
        <p className="text-gray-600 mt-1">
          Renforcez vos compétences pédagogiques et développez votre expertise en tant que tuteur.
        </p>
      </div>

      {/* Progress overview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Votre progression</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-primary-100 p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-primary-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">1/4</span>
            </div>
            <h3 className="font-medium">Modules complétés</h3>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary-600 h-2.5 rounded-full" 
                style={{ width: '25%' }}
              />
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-secondary-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-secondary-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">4h 15min</span>
            </div>
            <h3 className="font-medium">Temps de formation</h3>
            <p className="text-sm text-gray-500 mt-1">Sur 10h 30min au total</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-accent-100 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-accent-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">2/4</span>
            </div>
            <h3 className="font-medium">Quiz complétés</h3>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-accent-500 h-2.5 rounded-full" 
                style={{ width: '50%' }}
              />
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-success-100 p-2 rounded-full">
                <Award className="h-5 w-5 text-success-500" />
              </div>
              <span className="text-sm font-medium text-success-500">En cours</span>
            </div>
            <h3 className="font-medium">Statut certification</h3>
            <p className="text-sm text-gray-500 mt-1">Complétez tous les modules pour obtenir votre certification</p>
          </div>
        </div>
      </div>

      {/* Training modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Modules de formation</h2>
          <div className="space-y-3">
            {trainingModules.map((module, index) => (
              <motion.button
                key={module.id}
                onClick={() => module.status !== 'locked' && setActiveModule(index)}
                className={`w-full p-4 rounded-lg text-left transition ${
                  activeModule === index 
                    ? 'bg-primary-50 border-2 border-primary-200'
                    : module.status === 'locked'
                      ? 'bg-gray-50 border border-gray-200 opacity-70 cursor-not-allowed'
                      : 'bg-white border border-gray-200 hover:border-primary-200'
                }`}
                whileHover={module.status !== 'locked' ? { scale: 1.01 } : {}}
                whileTap={module.status !== 'locked' ? { scale: 0.99 } : {}}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium">{module.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                    
                    <div className="flex items-center mt-3 space-x-3">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {module.duration}
                      </div>
                      
                      {module.status === 'completed' && (
                        <span className="flex items-center text-sm text-success-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Complété
                        </span>
                      )}
                      
                      {module.status === 'in-progress' && (
                        <span className="flex items-center text-sm text-primary-600">
                          <BookOpen className="h-4 w-4 mr-1" />
                          En cours
                        </span>
                      )}
                      
                      {module.status === 'locked' && (
                        <span className="flex items-center text-sm text-gray-500">
                          <Award className="h-4 w-4 mr-1" />
                          À débloquer
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {module.status !== 'locked' && (
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <svg className="h-10 w-10" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="2"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          stroke={module.status === 'completed' ? '#10B981' : '#3B82F6'}
                          strokeWidth="2"
                          strokeDasharray="100"
                          strokeDashoffset={100 - module.progress}
                          transform="rotate(-90 18 18)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {module.progress}%
                      </div>
                    </div>
                  )}
                </div>
                
                {module.status !== 'locked' && (
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        module.status === 'completed' ? 'bg-success-500' : 'bg-primary-500'
                      }`}
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Community section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Communauté des tuteurs</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary-50 p-2 rounded-full">
                  <Users className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="font-medium">Forum des tuteurs</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Rejoignez les discussions avec d'autres tuteurs pour partager des conseils et bonnes pratiques.
              </p>
              <div className="flex space-x-2">
                <button className="btn btn-outline text-sm py-1.5 px-3 flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Voir les discussions
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {trainingModules[activeModule].status !== 'locked' ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold">{trainingModules[activeModule].title}</h2>
                  <p className="text-gray-600 mt-1">{trainingModules[activeModule].description}</p>
                </div>
                <div>
                  {trainingModules[activeModule].status === 'completed' ? (
                    <span className="inline-flex items-center bg-success-100 text-success-800 text-xs font-medium px-3 py-1 rounded-full">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Complété
                    </span>
                  ) : (
                    <span className="inline-flex items-center bg-primary-100 text-primary-800 text-xs font-medium px-3 py-1 rounded-full">
                      <BookOpen className="h-3 w-3 mr-1" />
                      En cours
                    </span>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                {trainingModules[activeModule].resources.map((resource, index) => (
                  <div 
                    key={index} 
                    className={`border ${resource.completed ? 'border-gray-200' : 'border-gray-300'} rounded-lg p-4 hover:bg-gray-50 transition-colors`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          resource.completed 
                            ? 'bg-success-100 text-success-600' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {getResourceIcon(resource.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-500 space-x-3">
                            <span className="capitalize">{resource.type}</span>
                            {resource.duration && (
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {resource.duration}
                              </span>
                            )}
                            {resource.pages && (
                              <span>{resource.pages} pages</span>
                            )}
                            {resource.questions && (
                              <span>{resource.questions} questions</span>
                            )}
                            {resource.count && (
                              <span>{resource.count} éléments</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        {resource.completed ? (
                          <span className="inline-flex items-center text-success-600 text-xs font-medium">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Complété
                          </span>
                        ) : (
                          <button className="btn btn-primary text-xs py-1 px-2">
                            {resource.type === 'video' || resource.type === 'tutorial' ? 'Regarder' : 
                             resource.type === 'pdf' ? 'Lire' : 
                             resource.type === 'templates' ? 'Télécharger' : 
                             resource.type === 'quiz' || resource.type === 'exercise' ? 'Commencer' : 
                             'Accéder'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {trainingModules[activeModule].status === 'in-progress' && (
                <div className="mt-6 flex justify-between">
                  {activeModule > 0 && (
                    <button 
                      onClick={() => setActiveModule(activeModule - 1)}
                      className="btn btn-outline"
                    >
                      Module précédent
                    </button>
                  )}
                  <div></div>
                  <button 
                    onClick={() => {}}
                    className="btn btn-primary"
                  >
                    Continuer la formation
                  </button>
                </div>
              )}
              
              {trainingModules[activeModule].status === 'completed' && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-success-100 p-3 rounded-full">
                      <Award className="h-6 w-6 text-success-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Module complété !</h3>
                      <p className="text-gray-600 mt-1">
                        Vous avez terminé ce module avec succès. Continuez votre formation pour obtenir votre certification.
                      </p>
                      <div className="mt-4 flex space-x-3">
                        {trainingModules[activeModule + 1] && trainingModules[activeModule + 1].status !== 'locked' && (
                          <button 
                            onClick={() => setActiveModule(activeModule + 1)}
                            className="btn btn-primary"
                          >
                            Module suivant
                          </button>
                        )}
                        <button 
                          onClick={() => {}}
                          className="btn btn-outline flex items-center"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Télécharger certificat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                <Award className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Module verrouillé</h3>
              <p className="text-gray-500 mb-6 max-w-lg mx-auto">
                Ce module sera disponible une fois que vous aurez terminé les modules précédents.
              </p>
              <button 
                onClick={() => setActiveModule(activeModule - 1)}
                className="btn btn-primary"
              >
                Retourner au module actif
              </button>
            </div>
          )}
          
          {/* Testimonials */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Ce que disent nos tuteurs certifiés</h2>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <img 
                  src="https://i.pravatar.cc/150?img=20" 
                  alt="Trainer" 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center mb-1">
                    <h3 className="font-medium mr-2">Sophie Ramiandrasoa</h3>
                    <span className="flex items-center text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">
                      <BadgeCheck className="h-3 w-3 mr-1" />
                      Tuteur certifié
                    </span>
                  </div>
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm italic">
                    "La formation offerte par MIABO a transformé ma façon d'enseigner. J'ai acquis des compétences précieuses 
                    qui m'ont permis d'adapter mon approche à chaque élève. Mes élèves progressent beaucoup plus rapidement 
                    et la plateforme facilite énormément le suivi et la communication."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorTrainingPage;