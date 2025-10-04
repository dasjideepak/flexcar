import React, { useState } from 'react';
import { VehicleFilters, Vehicle } from '../types/vehicle';
import { X, ChevronDown } from 'lucide-react';

interface MobileFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: VehicleFilters;
  onFiltersChange: (filters: VehicleFilters) => void;
  vehicles: Vehicle[];
  filteredCount: number;
}

export const MobileFilterModal: React.FC<MobileFilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  vehicles,
  filteredCount,
}) => {
  const [expandedSections, setExpandedSections] = useState<{
    make: boolean;
    color: boolean;
  }>({
    make: false,
    color: false,
  });

  if (!isOpen) return null;

  const toggleSection = (section: 'make' | 'color') => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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

  // Get counts for special filters
  const localCount = vehicles.filter((vehicle) => vehicle.isLocal).length;
  const recentlyAddedCount = vehicles.filter(
    (vehicle) => vehicle.isRecentlyAdded
  ).length;
  const brandNewCount = vehicles.filter((vehicle) => vehicle.isBrandNew).length;

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

  const handleSpecialFilterChange = (
    filterType: 'recentlyAdded' | 'localOnly' | 'brandNew',
    checked: boolean
  ) => {
    onFiltersChange({
      ...filters,
      [filterType]: checked,
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
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Special Filters */}
            <div className="space-y-4">
              {localCount > 0 && (
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.localOnly}
                    onChange={(e) =>
                      handleSpecialFilterChange('localOnly', e.target.checked)
                    }
                    className="w-5 h-5 text-primary-500 border border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                  />
                  <span className="ml-3 text-gray-700">
                    Local cars only ({localCount})
                  </span>
                </label>
              )}

              {recentlyAddedCount > 0 && (
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.recentlyAdded}
                    onChange={(e) =>
                      handleSpecialFilterChange(
                        'recentlyAdded',
                        e.target.checked
                      )
                    }
                    className="w-5 h-5 text-primary-500 border border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                  />
                  <span className="ml-3 text-gray-700">
                    Recently added ({recentlyAddedCount})
                  </span>
                </label>
              )}

              {brandNewCount > 0 && (
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brandNew}
                    onChange={(e) =>
                      handleSpecialFilterChange('brandNew', e.target.checked)
                    }
                    className="w-5 h-5 text-primary-500 border border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                  />
                  <span className="ml-3 text-gray-700">
                    Brand new ({brandNewCount})
                  </span>
                </label>
              )}
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200"></div>

            {/* Collapsible Sections */}
            <div className="space-y-4">
              {/* Make & Model */}
              <div>
                <button
                  onClick={() => toggleSection('make')}
                  className="flex items-center justify-between w-full py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <h3 className="font-medium text-gray-900">Make & Model</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedSections.make ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedSections.make && (
                  <div className="space-y-3 pl-2 mt-2">
                    {uniqueMakes.map((make) => (
                      <label
                        key={make}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.make.includes(make)}
                          onChange={(e) =>
                            handleMakeChange(make, e.target.checked)
                          }
                          className="w-4 h-4 text-primary-500 border border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                        />
                        <span className="ml-3 text-gray-700">{make}</span>
                        <span className="ml-auto text-gray-500 text-sm">
                          ({makeCounts[make]})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Color */}
              <div>
                <button
                  onClick={() => toggleSection('color')}
                  className="flex items-center justify-between w-full py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <h3 className="font-medium text-gray-900">Color</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedSections.color ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedSections.color && (
                  <div className="space-y-3 pl-2 mt-2">
                    {uniqueColors.map((color) => (
                      <label
                        key={color}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.color.includes(color)}
                          onChange={(e) =>
                            handleColorChange(color, e.target.checked)
                          }
                          className="w-4 h-4 text-primary-500 border border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                        />
                        <span className="ml-3 text-gray-700">{color}</span>
                        <span className="ml-auto text-gray-500 text-sm">
                          ({colorCounts[color]})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-white">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full mb-3 py-3 text-gray-600 font-medium hover:text-gray-800 transition-colors"
            >
              Clear all
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
          >
            View {filteredCount} results
          </button>
        </div>
      </div>
    </div>
  );
};
