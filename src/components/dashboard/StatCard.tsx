import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
  bgColor?: string;
  textColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  bgColor = 'bg-white',
  textColor = 'text-gray-800',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${bgColor} ${textColor} rounded-xl shadow-sm p-6 card-hover`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium opacity-80">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            {change && (
              <span className={`ml-2 text-xs font-medium ${change.isPositive ? 'text-success-500' : 'text-error-500'}`}>
                {change.isPositive ? '↑' : '↓'} {change.value}
              </span>
            )}
          </div>
        </div>
        <div className="rounded-lg p-3 bg-opacity-10 bg-gray-100">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;