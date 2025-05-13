import React from 'react';
import { Star, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface TutorCardProps {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  location: string;
  subjects: string[];
  experience: string;
  bio: string;
  hourlyRate: number;
  availability?: string[];
  matchPercentage?: number;
}

const TutorCard: React.FC<TutorCardProps> = ({
  id,
  name,
  avatar,
  rating,
  reviewCount,
  location,
  subjects,
  experience,
  bio,
  hourlyRate,
  availability,
  matchPercentage,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden card-hover flex flex-col h-full"
    >
      {matchPercentage && (
        <div className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 flex justify-center">
          {matchPercentage}% de correspondance
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={avatar}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary-100"
          />
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(rating) ? 'text-accent-500 fill-accent-500' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {rating} ({reviewCount} avis)
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin size={14} className="mr-1" />
              <span>{location}</span>
            </div>
          </div>
          
          <div className="text-right">
            <span className="block text-lg font-bold text-primary-600">{hourlyRate} €</span>
            <span className="text-sm text-gray-500">par heure</span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-1 mb-3">
            {subjects.map((subject, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
              >
                {subject}
              </span>
            ))}
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">{bio}</p>
          
          <div className="mt-3 text-sm text-gray-700">
            <span className="font-medium">Expérience:</span> {experience}
          </div>
          
          {availability && (
            <div className="mt-3">
              <div className="flex items-center text-sm text-gray-700 mb-1">
                <Clock size={14} className="mr-1" />
                <span className="font-medium">Disponibilité:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {availability.map((slot, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-100 flex space-x-2">
        <button className="btn btn-outline flex-1 py-1.5">
          Contacter
        </button>
        <button className="btn btn-primary flex-1 py-1.5">
          Réserver
        </button>
      </div>
    </motion.div>
  );
};

export default TutorCard;