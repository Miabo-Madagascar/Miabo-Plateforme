import React from 'react';
import { motion } from 'framer-motion';

interface LearningStyleProps {
  title: string;
  description: string;
  percentage: number;
  icon: React.ReactNode;
  color: string;
}

const LearningStyleCard: React.FC<LearningStyleProps> = ({
  title,
  description,
  percentage,
  icon,
  color,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden card-hover"
    >
      <div className={`${color} h-2`} />
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <div className={`${color} bg-opacity-20 p-2 rounded-lg`}>
            {icon}
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Niveau d'affinité</span>
            <span className="text-sm font-medium text-gray-700">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`${color} h-2.5 rounded-full`} 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        
        <p className="mt-4 text-sm text-gray-600">{description}</p>
        
        <button className="mt-4 text-sm font-medium text-primary-600 hover:text-primary-700">
          En savoir plus →
        </button>
      </div>
    </motion.div>
  );
};

export default LearningStyleCard;