import React from 'react';
import { VehicleFilters, Vehicle } from '../types/vehicle';
import { Filter } from 'lucide-react';

interface MobileFilterBarProps {
  filters: VehicleFilters;
  onFiltersChange: (filters: VehicleFilters) => void;
  vehicles: Vehicle[];
  onOpenModal: () => void;
  className?: string;
}

export const MobileFilterBar: React.FC<MobileFilterBarProps> = ({
  filters,
  onFiltersChange,
  vehicles,
  onOpenModal,
  className = '',
}) => {
  // Get unique body types with counts
  const bodyTypeCounts = vehicles.reduce((acc, vehicle) => {
    acc[vehicle.bodyType] = (acc[vehicle.bodyType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const uniqueBodyTypes = Object.keys(bodyTypeCounts).sort();

  // Get recently added count
  const recentlyAddedCount = vehicles.filter(
    (vehicle) => vehicle.isRecentlyAdded
  ).length;

  const handleBodyTypeToggle = (bodyType: string) => {
    const isSelected = filters.bodyType.includes(bodyType);
    const newBodyTypes = isSelected
      ? filters.bodyType.filter((bt) => bt !== bodyType)
      : [...filters.bodyType, bodyType];

    onFiltersChange({
      ...filters,
      bodyType: newBodyTypes,
    });
  };

  const handleRecentlyAddedToggle = () => {
    const isSelected = filters.recentlyAdded;
    onFiltersChange({
      ...filters,
      recentlyAdded: !isSelected,
    });
  };

  return (
    <div
      className={`flex mb-4 items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 overflow-x-auto ${className}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {/* Filter Button */}
      <button
        onClick={onOpenModal}
        className="flex items-center gap-2 px-3 py-2 text-primary-500 font-medium whitespace-nowrap flex-shrink-0"
      >
        <Filter className="w-4 h-4" />
        Filter
      </button>

      {/* Body Type Pills */}
      {uniqueBodyTypes.map((bodyType) => {
        const isSelected = filters.bodyType.includes(bodyType);
        return (
          <button
            key={bodyType}
            onClick={() => handleBodyTypeToggle(bodyType)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors ${
              isSelected
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {bodyType}
          </button>
        );
      })}

      {/* Recently Added Pill */}
      {recentlyAddedCount > 0 && (
        <button
          onClick={handleRecentlyAddedToggle}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors ${
            filters.recentlyAdded
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Recently added
        </button>
      )}
    </div>
  );
};
