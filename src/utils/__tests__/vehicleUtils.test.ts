import { Vehicle, VehicleFilters } from '../../types/vehicle';
import { filterVehicles, sortVehicles, processVehicles } from '../vehicleUtils';

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    trim: 'LE',
    year: 2022,
    color: 'Silver',
    mileage: 15000,
    price: 28500,
    image: 'https://example.com/car1.jpg',
    zipCode: '10001',
    bodyType: 'Sedan',
    isLocal: true,
    isRecentlyAdded: false,
    isBrandNew: false,
    monthlyPrice: 450,
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Civic',
    trim: 'EX',
    year: 2021,
    color: 'White',
    mileage: 22000,
    price: 24500,
    image: 'https://example.com/car2.jpg',
    zipCode: '10001',
    bodyType: 'Sedan',
    isLocal: false,
    isRecentlyAdded: true,
    isBrandNew: false,
    monthlyPrice: 380,
  },
  {
    id: '3',
    make: 'Toyota',
    model: 'RAV4',
    trim: 'XLE',
    year: 2023,
    color: 'Red',
    mileage: 5000,
    price: 32000,
    image: 'https://example.com/car3.jpg',
    zipCode: '10001',
    bodyType: 'SUV',
    isLocal: true,
    isRecentlyAdded: false,
    isBrandNew: true,
    monthlyPrice: 520,
  },
];

describe('vehicleUtils', () => {
  describe('filterVehicles', () => {
    it('returns all vehicles when no filters are applied', () => {
      const filters: VehicleFilters = {
        bodyType: [],
        make: [],
        color: [],
        recentlyAdded: false,
        localOnly: false,
        brandNew: false,
      };
      const result = filterVehicles(mockVehicles, filters);

      expect(result).toHaveLength(3);
      expect(result).toEqual(mockVehicles);
    });

    it('filters by make correctly', () => {
      const filters: VehicleFilters = {
        bodyType: [],
        make: ['Toyota'],
        color: [],
        recentlyAdded: false,
        localOnly: false,
        brandNew: false,
      };
      const result = filterVehicles(mockVehicles, filters);

      expect(result).toHaveLength(2);
      expect(result.every((vehicle) => vehicle.make === 'Toyota')).toBe(true);
    });

    it('filters by color correctly', () => {
      const filters: VehicleFilters = {
        bodyType: [],
        make: [],
        color: ['Red'],
        recentlyAdded: false,
        localOnly: false,
        brandNew: false,
      };
      const result = filterVehicles(mockVehicles, filters);

      expect(result).toHaveLength(1);
      expect(result[0].color).toBe('Red');
    });

    it('filters by body type correctly', () => {
      const filters: VehicleFilters = {
        bodyType: ['SUV'],
        make: [],
        color: [],
        recentlyAdded: false,
        localOnly: false,
        brandNew: false,
      };
      const result = filterVehicles(mockVehicles, filters);

      expect(result).toHaveLength(1);
      expect(result[0].bodyType).toBe('SUV');
    });

    it('filters by recently added correctly', () => {
      const filters: VehicleFilters = {
        bodyType: [],
        make: [],
        color: [],
        recentlyAdded: true,
        localOnly: false,
        brandNew: false,
      };
      const result = filterVehicles(mockVehicles, filters);

      expect(result).toHaveLength(1);
      expect(result[0].isRecentlyAdded).toBe(true);
    });

    it('filters by local only correctly', () => {
      const filters: VehicleFilters = {
        bodyType: [],
        make: [],
        color: [],
        recentlyAdded: false,
        localOnly: true,
        brandNew: false,
      };
      const result = filterVehicles(mockVehicles, filters);

      expect(result).toHaveLength(2);
      expect(result.every((vehicle) => vehicle.isLocal)).toBe(true);
    });

    it('filters by brand new correctly', () => {
      const filters: VehicleFilters = {
        bodyType: [],
        make: [],
        color: [],
        recentlyAdded: false,
        localOnly: false,
        brandNew: true,
      };
      const result = filterVehicles(mockVehicles, filters);

      expect(result).toHaveLength(1);
      expect(result[0].isBrandNew).toBe(true);
    });

    it('filters by both make and color', () => {
      const filters: VehicleFilters = {
        bodyType: [],
        make: ['Toyota'],
        color: ['Silver'],
        recentlyAdded: false,
        localOnly: false,
        brandNew: false,
      };
      const result = filterVehicles(mockVehicles, filters);

      expect(result).toHaveLength(1);
      expect(result[0].make).toBe('Toyota');
      expect(result[0].color).toBe('Silver');
    });

    it('returns empty array when no vehicles match filters', () => {
      const filters: VehicleFilters = {
        bodyType: [],
        make: ['BMW'],
        color: ['Blue'],
        recentlyAdded: false,
        localOnly: false,
        brandNew: false,
      };
      const result = filterVehicles(mockVehicles, filters);

      expect(result).toHaveLength(0);
    });

    it('is case insensitive', () => {
      const filters: VehicleFilters = {
        bodyType: [],
        make: ['toyota'],
        color: ['SILVER'],
        recentlyAdded: false,
        localOnly: false,
        brandNew: false,
      };
      const result = filterVehicles(mockVehicles, filters);

      expect(result).toHaveLength(1);
      expect(result[0].make).toBe('Toyota');
      expect(result[0].color).toBe('Silver');
    });

    it('combines multiple filter types correctly', () => {
      const filters: VehicleFilters = {
        bodyType: ['Sedan'],
        make: ['Toyota'],
        color: [],
        recentlyAdded: false,
        localOnly: true,
        brandNew: false,
      };
      const result = filterVehicles(mockVehicles, filters);

      expect(result).toHaveLength(1);
      expect(result[0].make).toBe('Toyota');
      expect(result[0].bodyType).toBe('Sedan');
      expect(result[0].isLocal).toBe(true);
    });
  });

  describe('sortVehicles', () => {
    it('sorts by price high to low', () => {
      const result = sortVehicles(mockVehicles, 'price-high');

      expect(result[0].price).toBe(32000); // RAV4
      expect(result[1].price).toBe(28500); // Camry
      expect(result[2].price).toBe(24500); // Civic
    });

    it('sorts by price low to high', () => {
      const result = sortVehicles(mockVehicles, 'price-low');

      expect(result[0].price).toBe(24500); // Civic
      expect(result[1].price).toBe(28500); // Camry
      expect(result[2].price).toBe(32000); // RAV4
    });

    it('sorts by model alphabetically', () => {
      const result = sortVehicles(mockVehicles, 'model');

      expect(result[0].model).toBe('Camry');
      expect(result[1].model).toBe('Civic');
      expect(result[2].model).toBe('RAV4');
    });

    it('sorts by recently added first, then by price when sorting by popularity', () => {
      const result = sortVehicles(mockVehicles, 'popularity');

      // Recently added vehicle (Civic) should be first
      expect(result[0].isRecentlyAdded).toBe(true);
      expect(result[0].make).toBe('Honda');

      // Then sorted by monthly price (low to high)
      expect(result[1].monthlyPrice).toBeLessThanOrEqual(
        result[2].monthlyPrice
      );
    });

    it('sorts by recently added when specified', () => {
      const result = sortVehicles(mockVehicles, 'recently-added');

      expect(result[0].isRecentlyAdded).toBe(true); // Civic
      expect(result[1].isRecentlyAdded).toBe(false); // Camry or RAV4
      expect(result[2].isRecentlyAdded).toBe(false); // Camry or RAV4
    });

    it('sorts by earliest available (local first) when specified', () => {
      const result = sortVehicles(mockVehicles, 'earliest-available');

      // Local vehicles should come first
      const localVehicles = result.filter((v) => v.isLocal);
      const nonLocalVehicles = result.filter((v) => !v.isLocal);

      expect(localVehicles.length).toBe(2);
      expect(nonLocalVehicles.length).toBe(1);
      expect(result[0].isLocal).toBe(true);
    });

    it('does not mutate original array', () => {
      const originalVehicles = [...mockVehicles];
      sortVehicles(mockVehicles, 'price-high');

      expect(mockVehicles).toEqual(originalVehicles);
    });
  });

  describe('processVehicles', () => {
    it('applies filters and sorting correctly', () => {
      const filters: VehicleFilters = {
        bodyType: [],
        make: ['Toyota'],
        color: [],
        recentlyAdded: false,
        localOnly: false,
        brandNew: false,
      };
      const result = processVehicles(mockVehicles, filters, 'price-high');

      expect(result).toHaveLength(2);
      expect(result.every((vehicle) => vehicle.make === 'Toyota')).toBe(true);
      expect(result[0].price).toBe(32000); // RAV4
      expect(result[1].price).toBe(28500); // Camry
    });

    it('returns empty array when filters match no vehicles', () => {
      const filters: VehicleFilters = {
        bodyType: [],
        make: ['BMW'],
        color: ['Blue'],
        recentlyAdded: false,
        localOnly: false,
        brandNew: false,
      };
      const result = processVehicles(mockVehicles, filters, 'price-low');

      expect(result).toHaveLength(0);
    });

    it('handles empty vehicle array', () => {
      const filters: VehicleFilters = {
        bodyType: [],
        make: [],
        color: [],
        recentlyAdded: false,
        localOnly: false,
        brandNew: false,
      };
      const result = processVehicles([], filters, 'price-low');

      expect(result).toHaveLength(0);
    });

    it('applies complex filters with multiple criteria', () => {
      const filters: VehicleFilters = {
        bodyType: ['Sedan'],
        make: ['Toyota'],
        color: ['Silver'],
        recentlyAdded: false,
        localOnly: true,
        brandNew: false,
      };
      const result = processVehicles(mockVehicles, filters, 'popularity');

      expect(result).toHaveLength(1);
      expect(result[0].make).toBe('Toyota');
      expect(result[0].bodyType).toBe('Sedan');
      expect(result[0].color).toBe('Silver');
      expect(result[0].isLocal).toBe(true);
    });

    it('applies sorting without filters', () => {
      const filters: VehicleFilters = {
        bodyType: [],
        make: [],
        color: [],
        recentlyAdded: false,
        localOnly: false,
        brandNew: false,
      };
      const result = processVehicles(mockVehicles, filters, 'recently-added');

      expect(result).toHaveLength(3);
      expect(result[0].isRecentlyAdded).toBe(true); // Civic should be first
    });
  });
});
