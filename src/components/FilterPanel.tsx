import React from 'react';
import { VehicleFilters, Vehicle } from '../types/vehicle';
import { CollapsibleSection } from './CollapsibleSection';
import { Palette } from 'lucide-react';

interface FilterPanelProps {
  filters: VehicleFilters;
  onFiltersChange: (filters: VehicleFilters) => void;
  vehicles: Vehicle[];
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  vehicles,
  className = '',
}) => {
  const makeCounts = vehicles.reduce((acc, vehicle) => {
    acc[vehicle.make] = (acc[vehicle.make] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const colorCounts = vehicles.reduce((acc, vehicle) => {
    acc[vehicle.color] = (acc[vehicle.color] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const uniqueMakes = Object.keys(makeCounts).sort();
  const uniqueColors = Object.keys(colorCounts).sort();

  const handleMakeChange = (make: string, checked: boolean) => {
    const newMakes = checked
      ? [...filters.make, make]
      : filters.make.filter((m) => m !== make);

    onFiltersChange({
      ...filters,
      make: newMakes,
    });
  };

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked
      ? [...filters.color, color]
      : filters.color.filter((c) => c !== color);

    onFiltersChange({
      ...filters,
      color: newColors,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      bodyType: [],
      make: [],
      color: [],
      recentlyAdded: false,
      localOnly: false,
      brandNew: false,
    });
  };

  const hasActiveFilters =
    filters.bodyType.length > 0 ||
    filters.make.length > 0 ||
    filters.color.length > 0 ||
    filters.recentlyAdded ||
    filters.localOnly ||
    filters.brandNew;

  return (
    <div className={`bg-white rounded-t-2xl p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Make & Model Filter */}
        <CollapsibleSection title="Make & Model" defaultExpanded={true}>
          <div className="space-y-3">
            {uniqueMakes.map((make) => (
              <label key={make} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.make.includes(make)}
                  onChange={(e) => handleMakeChange(make, e.target.checked)}
                  className="w-4 h-4 text-gray-600 border border-gray-300 rounded focus:ring-0 focus:outline-none"
                />
                <span className="ml-3 text-sm text-gray-700">{make}</span>
                <span className="ml-auto text-sm text-gray-500">
                  ({makeCounts[make]})
                </span>
              </label>
            ))}
          </div>
        </CollapsibleSection>

        {/* Color Filter */}
        <CollapsibleSection
          title="Color"
          defaultExpanded={true}
          icon={<Palette className="w-4 h-4" />}
        >
          <div className="space-y-3">
            {uniqueColors.map((color) => (
              <label key={color} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.color.includes(color)}
                  onChange={(e) => handleColorChange(color, e.target.checked)}
                  className="w-4 h-4 text-gray-600 border border-gray-300 rounded focus:ring-0 focus:outline-none"
                />
                <span className="ml-3 text-sm text-gray-700">{color}</span>
                <span className="ml-auto text-sm text-gray-500">
                  ({colorCounts[color]})
                </span>
              </label>
            ))}
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};
