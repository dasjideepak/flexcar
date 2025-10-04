export interface Vehicle {
  id: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  image: string;
  zipCode: string;
  bodyType: 'Sedan' | 'SUV' | 'Pickup Truck' | 'Minivan';
  isLocal: boolean;
  isRecentlyAdded: boolean;
  isBrandNew: boolean;
  monthlyPrice: number;
}

export interface VehicleFilters {
  bodyType: string[];
  make: string[];
  color: string[];
  recentlyAdded: boolean;
  localOnly: boolean;
  brandNew: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}

export type SortType =
  | 'popularity'
  | 'price-low'
  | 'price-high'
  | 'recently-added'
  | 'earliest-available';

export interface SearchFormValues {
  zipCode: string;
}
