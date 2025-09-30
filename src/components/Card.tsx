import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 ${className}`}
    >
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};
