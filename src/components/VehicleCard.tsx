import React, { useState } from 'react';
import { Vehicle } from '../types/vehicle';
import { VehicleDetailsModal } from './VehicleDetailsModal';

interface VehicleCardProps {
  vehicle: Vehicle;
  className?: string;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  className = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatMileage = (mileage: number): string => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Calculate insurance cost (simplified calculation)
  const insuranceCost = Math.round(vehicle.monthlyPrice * 0.4);
  const totalMonthly = vehicle.monthlyPrice + insuranceCost;

  // Generate delivery date (7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const deliveryDateStr = deliveryDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer ${className}`}
      onClick={handleViewDetails}
    >
      {/* Vehicle Image */}
      <div className="relative">
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </div>

      {/* Vehicle Information */}
      <div className="p-4">
        {/* Vehicle Title */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {vehicle.year} • {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-sm text-gray-600">
            {vehicle.trim} • {formatMileage(vehicle.mileage)} miles •{' '}
            {vehicle.color}
          </p>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 mb-4"></div>

        {/* Pricing Breakdown */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Car</span>
            <span className="text-sm font-medium text-gray-900">
              ${vehicle.monthlyPrice}/mo
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">
              Insurance + Protection
            </span>
            <span className="text-sm font-medium text-gray-900">
              ${insuranceCost}/mo
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="text-sm font-bold text-gray-900">Total</span>
            <span className="text-sm font-bold text-gray-900">
              ${totalMonthly}/mo
            </span>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="text-xs text-gray-500">Get it by {deliveryDateStr}</div>
      </div>

      {/* Vehicle Details Modal */}
      <VehicleDetailsModal
        vehicle={vehicle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
