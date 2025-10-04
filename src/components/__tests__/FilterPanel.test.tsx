import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterPanel } from '../FilterPanel';
import { Vehicle, VehicleFilters } from '../../types/vehicle';

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

describe('FilterPanel', () => {
  const mockOnFiltersChange = jest.fn();
  const defaultFilters: VehicleFilters = {
    bodyType: [],
    make: [],
    color: [],
    recentlyAdded: false,
    localOnly: false,
    brandNew: false,
  };

  beforeEach(() => {
    mockOnFiltersChange.mockClear();
  });

  it('renders filter panel correctly', () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        onFiltersChange={mockOnFiltersChange}
        vehicles={mockVehicles}
      />
    );

    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Make & Model')).toBeInTheDocument();
    expect(screen.getByText('Color')).toBeInTheDocument();
  });

  it('populates make filter with unique makes', () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        onFiltersChange={mockOnFiltersChange}
        vehicles={mockVehicles}
      />
    );

    expect(screen.getByText('Honda')).toBeInTheDocument();
    expect(screen.getByText('Toyota')).toBeInTheDocument();
  });

  it('populates color filter with unique colors', () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        onFiltersChange={mockOnFiltersChange}
        vehicles={mockVehicles}
      />
    );

    expect(screen.getByText('Red')).toBeInTheDocument();
    expect(screen.getByText('Silver')).toBeInTheDocument();
    expect(screen.getByText('White')).toBeInTheDocument();
  });

  it('calls onFiltersChange when make filter changes', () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        onFiltersChange={mockOnFiltersChange}
        vehicles={mockVehicles}
      />
    );

    const toyotaCheckbox = screen.getByLabelText(/Toyota/);
    fireEvent.click(toyotaCheckbox);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      bodyType: [],
      make: ['Toyota'],
      color: [],
      recentlyAdded: false,
      localOnly: false,
      brandNew: false,
    });
  });

  it('calls onFiltersChange when color filter changes', () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        onFiltersChange={mockOnFiltersChange}
        vehicles={mockVehicles}
      />
    );

    const redCheckbox = screen.getByLabelText(/Red/);
    fireEvent.click(redCheckbox);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      bodyType: [],
      make: [],
      color: ['Red'],
      recentlyAdded: false,
      localOnly: false,
      brandNew: false,
    });
  });

  it('shows clear all button when filters are active', () => {
    const activeFilters: VehicleFilters = {
      bodyType: [],
      make: ['Toyota'],
      color: ['Red'],
      recentlyAdded: false,
      localOnly: false,
      brandNew: false,
    };

    render(
      <FilterPanel
        filters={activeFilters}
        onFiltersChange={mockOnFiltersChange}
        vehicles={mockVehicles}
      />
    );

    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });

  it('clears filters when clear all is clicked', () => {
    const activeFilters: VehicleFilters = {
      bodyType: [],
      make: ['Toyota'],
      color: ['Red'],
      recentlyAdded: false,
      localOnly: false,
      brandNew: false,
    };

    render(
      <FilterPanel
        filters={activeFilters}
        onFiltersChange={mockOnFiltersChange}
        vehicles={mockVehicles}
      />
    );

    const clearButton = screen.getByText('Clear all');
    fireEvent.click(clearButton);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      bodyType: [],
      make: [],
      color: [],
      recentlyAdded: false,
      localOnly: false,
      brandNew: false,
    });
  });

  it('shows vehicle counts in filter options', () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        onFiltersChange={mockOnFiltersChange}
        vehicles={mockVehicles}
      />
    );

    // Check that vehicle counts are displayed
    // Toyota appears twice (2 vehicles)
    expect(screen.getAllByText('(2)')).toHaveLength(1);
    // Honda, Red, Silver, White each appear once
    expect(screen.getAllByText('(1)')).toHaveLength(4);
  });
});
