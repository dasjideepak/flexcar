import { Vehicle, VehicleFilters, SortType } from '../types/vehicle';

export const filterVehicles = (
  vehicles: Vehicle[],
  filters: VehicleFilters
): Vehicle[] => {
  return vehicles.filter((vehicle) => {
    // Body type filter (case insensitive)
    const bodyTypeMatch =
      filters.bodyType.length === 0 ||
      filters.bodyType.some(
        (filter) => filter.toLowerCase() === vehicle.bodyType.toLowerCase()
      );

    // Make filter (case insensitive)
    const makeMatch =
      filters.make.length === 0 ||
      filters.make.some(
        (filter) => filter.toLowerCase() === vehicle.make.toLowerCase()
      );

    // Color filter (case insensitive)
    const colorMatch =
      filters.color.length === 0 ||
      filters.color.some(
        (filter) => filter.toLowerCase() === vehicle.color.toLowerCase()
      );

    // Special filters
    const recentlyAddedMatch =
      !filters.recentlyAdded || vehicle.isRecentlyAdded;
    const localOnlyMatch = !filters.localOnly || vehicle.isLocal;
    const brandNewMatch = !filters.brandNew || vehicle.isBrandNew;

    return (
      bodyTypeMatch &&
      makeMatch &&
      colorMatch &&
      recentlyAddedMatch &&
      localOnlyMatch &&
      brandNewMatch
    );
  });
};

export const sortVehicles = (
  vehicles: Vehicle[],
  sortType: SortType
): Vehicle[] => {
  const sortedVehicles = [...vehicles];

  switch (sortType) {
    case 'popularity':
      // Sort by popularity (could be based on views, bookings, etc.)
      // For now, we'll use a combination of factors
      return sortedVehicles.sort((a, b) => {
        // Sort by recently added first, then by price low to high
        if (a.isRecentlyAdded !== b.isRecentlyAdded) {
          return a.isRecentlyAdded ? -1 : 1;
        }
        return a.monthlyPrice - b.monthlyPrice;
      });
    case 'price-low':
      return sortedVehicles.sort((a, b) => a.monthlyPrice - b.monthlyPrice);
    case 'price-high':
      return sortedVehicles.sort((a, b) => b.monthlyPrice - a.monthlyPrice);
    case 'recently-added':
      return sortedVehicles.sort((a, b) => {
        if (a.isRecentlyAdded !== b.isRecentlyAdded) {
          return a.isRecentlyAdded ? -1 : 1;
        }
        return b.year - a.year; // Newer years first
      });
    case 'earliest-available':
      // Sort by year (newer first) and then by mileage (lower first)
      return sortedVehicles.sort((a, b) => {
        if (a.year !== b.year) {
          return b.year - a.year;
        }
        return a.mileage - b.mileage;
      });
    default:
      return sortedVehicles;
  }
};

export const processVehicles = (
  vehicles: Vehicle[],
  filters: VehicleFilters,
  sortType: SortType
): Vehicle[] => {
  const filtered = filterVehicles(vehicles, filters);
  return sortVehicles(filtered, sortType);
};
