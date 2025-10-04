import React, { useState, useCallback } from 'react';
import { SearchForm } from './components/SearchForm';
import { FilterPanel } from './components/FilterPanel';
import { MobileFilterBar } from './components/MobileFilterBar';
import { MobileFilterModal } from './components/MobileFilterModal';
import { SortDropdown } from './components/SortDropdown';
import { VehicleGrid } from './components/VehicleGrid';
import ErrorMessage from './components/ErrorMessage';
import { getVehiclesByZipCode, getAllVehicles } from './data/vehicles';
import { processVehicles } from './utils/vehicleUtils';
import {
  Vehicle,
  VehicleFilters,
  SortType,
  SearchFormValues,
} from './types/vehicle';

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<VehicleFilters>({
    bodyType: [],
    make: [],
    color: [],
    recentlyAdded: false,
    localOnly: false,
    brandNew: false,
  });
  const [sortType, setSortType] = useState<SortType>('popularity');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [currentZipCode, setCurrentZipCode] = useState<string>('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleSearch = useCallback(async (values: SearchFormValues) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 100));

      let foundVehicles: Vehicle[];

      if (values.zipCode.trim() === '') {
        // If no ZIP code provided, show all vehicles
        foundVehicles = getAllVehicles();
        setCurrentZipCode('');
      } else {
        // Filter by ZIP code
        foundVehicles = getVehiclesByZipCode(values.zipCode);
        setCurrentZipCode(values.zipCode);
      }

      if (foundVehicles.length === 0) {
        setError(
          `No vehicles found for ZIP code ${values.zipCode}. Please try a different ZIP code.`
        );
        setVehicles([]);
      } else {
        setVehicles(foundVehicles);
        // Reset filters when new search is performed
        setFilters({
          bodyType: [],
          make: [],
          color: [],
          recentlyAdded: false,
          localOnly: false,
          brandNew: false,
        });
      }
    } catch (err) {
      setError(
        'An error occurred while searching for vehicles. Please try again.'
      );
      setVehicles([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFiltersChange = useCallback((newFilters: VehicleFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSortChange = useCallback((newSortType: SortType) => {
    setSortType(newSortType);
  }, []);

  const processedVehicles = processVehicles(vehicles, filters, sortType);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <img
            src={require('./assets/flexcar-logo.webp')}
            alt="FlexCar"
            className="h-12"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <SearchForm onSubmit={handleSearch} isLoading={isLoading} />

        {/* Error Message */}
        {error && <ErrorMessage error={error} />}

        {/* Results Section */}
        {vehicles.length > 0 && (
          <>
            {/* Mobile Filter Bar */}
            <div className="lg:hidden">
              <MobileFilterBar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                vehicles={vehicles}
                onOpenModal={() => setIsFilterModalOpen(true)}
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Desktop Filters Sidebar */}
              <div className="hidden lg:block lg:w-64 flex-shrink-0">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  vehicles={vehicles}
                />
              </div>

              {/* Vehicle Grid */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Available Vehicles
                    </h2>
                    {currentZipCode && (
                      <p className="text-gray-600 mt-1">
                        Showing results for ZIP code {currentZipCode}
                      </p>
                    )}
                  </div>
                  <SortDropdown
                    sortType={sortType}
                    onSortChange={handleSortChange}
                  />
                </div>

                <VehicleGrid vehicles={processedVehicles} />
              </div>
            </div>

            {/* Mobile Filter Modal */}
            <MobileFilterModal
              isOpen={isFilterModalOpen}
              onClose={() => setIsFilterModalOpen(false)}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              vehicles={vehicles}
              filteredCount={processedVehicles.length}
            />
          </>
        )}

        {/* Welcome Hero Section */}
        {vehicles.length === 0 && !error && !isLoading && (
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl shadow-xl border border-gray-100">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
              <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
            </div>

            <div className="relative px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
              <div className="text-center max-w-4xl mx-auto">
                {/* Icon */}
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Main Heading */}
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    FlexCar
                  </span>
                </h2>

                {/* Subtitle */}
                <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Discover your perfect vehicle with our premium selection of
                  quality cars.
                  <span className="text-blue-600 font-semibold">
                    {' '}
                    Fast, reliable, and affordable.
                  </span>
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
                  <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Quality Assured
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      Every vehicle is thoroughly inspected
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Fast Delivery
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      Get your car delivered quickly
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Best Prices
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      Competitive rates for everyone
                    </p>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                  <p className="text-lg text-gray-700 mb-4">
                    Ready to find your perfect ride?
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-blue-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    <span className="font-semibold">
                      Enter your ZIP code above to get started
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
