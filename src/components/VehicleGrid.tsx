import React from 'react';
import { Vehicle } from '../types/vehicle';
import { VehicleCard } from './VehicleCard';

interface VehicleGridProps {
  vehicles: Vehicle[];
  isLoading?: boolean;
  className?: string;
}

export const VehicleGrid: React.FC<VehicleGridProps> = ({
  vehicles,
  isLoading = false,
  className = '',
}) => {
  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
          >
            <div className="h-48 bg-gray-300"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded mb-4 w-2/3"></div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="h-3 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
              </div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-400 text-6xl mb-4">🚗</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No vehicles found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search criteria or filters to find more vehicles.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};
