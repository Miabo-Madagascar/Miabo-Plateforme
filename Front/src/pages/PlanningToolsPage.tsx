import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Edit, Clock, File, Calendar, User,
  Plus, BookOpen, Check, Upload, Download,
  Bookmark, Search, Filter, Trash, Copy
} from 'lucide-react';
import NewDocumentModal from '../components/dashboard/newDocumentModal';
import ImportModal from '../components/dashboard/ImportModal';

const PlanningToolsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('syllabus');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showNewModal, setShowNewModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  // Mock templates data
  const templates = [
    {
      id: 1,
      title: "Plan de cours complet",
      description: "Structure détaillée pour un cours entier avec objectifs, activités et évaluations",
      type: "syllabus",
      category: "Général",
      author: "Équipe MIABO",
      createdAt: "12/04/2023",
      favorite: true,
    },
    {
      id: 2,
      title: "Leçon individuelle - Mathématiques",
      description: "Format pour une leçon de mathématiques de 1h avec exercices progressifs",
      type: "lesson",
      category: "Mathématiques",
      author: "Équipe MIABO",
      createdAt: "05/03/2023",
      favorite: false,
    },
    {
      id: 3,
      title: "Fiche de révision - Vocabulaire",
      description: "Modèle de fiche pour réviser du vocabulaire en langues étrangères",
      type: "worksheet",
      category: "Langues",
      author: "Équipe MIABO",
      createdAt: "20/02/2023",
      favorite: true,
    },
    {
      id: 4,
      title: "Plan de progrès mensuel",
      description: "Suivi des objectifs et du progrès sur un mois pour l'élève",
      type: "syllabus",
      category: "Suivi",
      author: "Équipe MIABO",
      createdAt: "15/01/2023",
      favorite: false,
    },
  ];

  // Mock documents data
  const documents = [
    {
      id: 1,
      title: "Syllabus - Cours de mathématiques avancées",
      description: "Plan du cours de mathématiques pour Aina Rakoto",
      type: "syllabus",
      student: "Aina Rakoto",
      createdAt: "10/05/2023",
      lastEdited: "15/05/2023",
      favorite: true,
    },
    {
      id: 2,
      title: "Leçon - Introduction aux équations du second degré",
      description: "Plan de leçon pour la session du 15 mai 2023",
      type: "lesson",
      student: "Faniry Andria",
      createdAt: "12/05/2023",
      lastEdited: "12/05/2023",
      favorite: false,
    },
    {
      id: 3,
      title: "Fiche - Exercices sur les fractions",
      description: "Série d'exercices pour révision des fractions",
      type: "worksheet",
      student: "Aina Rakoto",
      createdAt: "08/05/2023",
      lastEdited: "09/05/2023",
      favorite: true,
    },
  ];

  // Filter documents based on type and search term
  const filteredDocuments = [...templates, ...documents].filter(doc => {
    const matchesType = selectedFilter === 'all' || doc.type === selectedFilter;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Get icon based on document type
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'syllabus':
        return <BookOpen className="h-5 w-5" />;
      case 'lesson':
        return <Calendar className="h-5 w-5" />;
      case 'worksheet':
        return <File className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Outils de planification
        </h1>
        <p className="text-gray-600 mt-1">
          Créez et gérez des plans de cours, des leçons et des fiches de travail pour vos élèves.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setShowNewModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau document
        </button>
        <button
          className="flex items-center border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
          onClick={() => setShowImportModal(true)}
        >
          <Upload className="h-4 w-4 mr-2" />
          Importer
        </button>
      </div>

      {/* Modales */}
      <NewDocumentModal isOpen={showNewModal} onClose={() => setShowNewModal(false)} />
      <ImportModal isOpen={showImportModal} onClose={() => setShowImportModal(false)} />

      {/* Search and filter */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher des documents..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="input"
            >
              <option value="all">Tous les types</option>
              <option value="syllabus">Plans de cours</option>
              <option value="lesson">Leçons</option>
              <option value="worksheet">Fiches de travail</option>
            </select>
          </div>
        </div>
      </div>

      {/* Document tabs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('syllabus')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'syllabus'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Mes documents
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'templates'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Modèles
            </button>
            <button
              onClick={() => setActiveTab('shared')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'shared'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Partagés avec moi
            </button>
          </div>
        </div>

        {/* Document grid */}
        <div className="p-6">
          {filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden card-hover"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          doc.type === 'syllabus' ? 'bg-primary-100 text-primary-600' :
                          doc.type === 'lesson' ? 'bg-secondary-100 text-secondary-600' :
                          'bg-accent-100 text-accent-600'
                        }`}>
                          {getDocumentIcon(doc.type)}
                        </div>
                        <div>
                          <h3 className="font-medium line-clamp-1">{doc.title}</h3>
                          <p className="text-sm text-gray-500 capitalize">{doc.type}</p>
                        </div>
                      </div>

                      <button className={`p-1 rounded-full hover:bg-gray-100 ${
                        doc.favorite ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600'
                      }`}>
                        <Bookmark className="h-5 w-5" fill={doc.favorite ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 mt-3 line-clamp-2">{doc.description}</p>

                    <div className="mt-4 flex items-center text-xs text-gray-500">
                      {'student' in doc ? (
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>{doc.student}</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>{doc.author}</span>
                        </div>
                      )}
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {'lastEdited' in doc ? doc.lastEdited : doc.createdAt}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
                    {'student' in doc ? (
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200">
                          <Copy className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                      {'student' in doc ? 'Ouvrir' : 'Utiliser'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                <File className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun document trouvé</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm
                  ? `Aucun résultat pour "${searchTerm}"`
                  : "Vous n'avez pas encore de documents de ce type"}
              </p>
              <button className="btn btn-primary flex items-center mx-auto">
                <Plus className="h-4 w-4 mr-2" />
                Créer un nouveau document
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Document creation guide */}
      <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
        <h2 className="text-lg font-semibold text-primary-800 mb-4">Comment créer des documents efficaces</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex space-x-3">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white flex items-center justify-center text-primary-600 font-semibold">
              1
            </div>
            <div>
              <h3 className="font-medium text-primary-700 mb-1">Définir les objectifs</h3>
              <p className="text-sm text-primary-600">
                Commencez par définir clairement les objectifs d'apprentissage pour l'élève.
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white flex items-center justify-center text-primary-600 font-semibold">
              2
            </div>
            <div>
              <h3 className="font-medium text-primary-700 mb-1">Structurer le contenu</h3>
              <p className="text-sm text-primary-600">
                Organisez le contenu de manière logique avec une progression claire.
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white flex items-center justify-center text-primary-600 font-semibold">
              3
            </div>
            <div>
              <h3 className="font-medium text-primary-700 mb-1">Personnaliser</h3>
              <p className="text-sm text-primary-600">
                Adaptez les documents au style d'apprentissage et aux besoins spécifiques de chaque élève.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700 inline-flex items-center">
            Voir le guide complet sur la création de documents pédagogiques
            <Check className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlanningToolsPage;
