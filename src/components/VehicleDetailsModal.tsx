import React from 'react';
import { Vehicle } from '../types/vehicle';
import { X, Zap, Calendar, Building, MapPin } from 'lucide-react';

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({
  vehicle,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !vehicle) return null;

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number): string => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  const getColorValue = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      Silver: '#E5E7EB',
      White: '#FFFFFF',
      Black: '#1F2937',
      Blue: '#3B82F6',
      Red: '#EF4444',
      Gray: '#9CA3AF',
    };
    return colorMap[colorName] || '#9CA3AF';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('🚪 Closing vehicle details modal');
              onClose();
            }}
            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative">
              <img
                src={vehicle.image}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                className="w-full h-64 lg:h-full object-cover transition-opacity duration-300"
                loading="eager"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    'https://via.placeholder.com/1200x800?text=Vehicle+Image';
                }}
              />
              {/* Price Badge */}
              <div className="absolute top-4 left-4 bg-primary-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg">
                {formatPrice(vehicle.price)}
              </div>
              {/* Monthly Price Badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                ${vehicle.monthlyPrice}/month
              </div>
            </div>

            {/* Details Section */}
            <div className="p-6 lg:p-8">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h1>
                <p className="text-xl text-gray-600 mb-4">{vehicle.trim}</p>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {vehicle.isBrandNew && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Brand New
                    </span>
                  )}
                  {vehicle.isRecentlyAdded && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Recently Added
                    </span>
                  )}
                  {vehicle.isLocal && (
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      Local Car
                    </span>
                  )}
                </div>
              </div>

              {/* Vehicle Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: getColorValue(vehicle.color) }}
                    />
                    <div>
                      <p className="text-sm text-gray-500">Color</p>
                      <p className="font-semibold text-gray-900">
                        {vehicle.color}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-6 h-6 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Mileage</p>
                      <p className="font-semibold text-gray-900">
                        {formatMileage(vehicle.mileage)} mi
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Year</p>
                      <p className="font-semibold text-gray-900">
                        {vehicle.year}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Building className="w-6 h-6 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Body Type</p>
                      <p className="font-semibold text-gray-900">
                        {vehicle.bodyType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-gray-900">
                      ZIP Code: {vehicle.zipCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold text-lg">
                  Contact Seller
                </button>
                <button className="flex-1 bg-gray-100 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-lg">
                  Save Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
