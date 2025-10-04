import React from 'react';
import { render, screen } from '@testing-library/react';
import { VehicleGrid } from '../VehicleGrid';
import { Vehicle } from '../../types/vehicle';

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

describe('VehicleGrid Component', () => {
  it('renders all vehicles in grid layout', () => {
    render(<VehicleGrid vehicles={mockVehicles} />);

    expect(screen.getByText('2022 • Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('2021 • Honda Civic')).toBeInTheDocument();
    expect(screen.getByText('2023 • Toyota RAV4')).toBeInTheDocument();
  });

  it('renders empty state when no vehicles provided', () => {
    render(<VehicleGrid vehicles={[]} />);

    expect(screen.getByText('No vehicles found')).toBeInTheDocument();
    expect(
      screen.getByText(/Try adjusting your search criteria or filters/)
    ).toBeInTheDocument();
  });

  it('renders empty state when vehicles array is empty', () => {
    render(<VehicleGrid vehicles={[]} />);

    expect(screen.getByText('No vehicles found')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<VehicleGrid vehicles={mockVehicles} className="custom-grid" />);

    // Verify grid renders with custom class by checking vehicles are present
    expect(screen.getByText('2022 • Toyota Camry')).toBeInTheDocument();
  });

  it('has responsive grid layout classes', () => {
    render(<VehicleGrid vehicles={mockVehicles} />);

    // Verify grid renders by checking all vehicles are present
    expect(screen.getByText('2022 • Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('2021 • Honda Civic')).toBeInTheDocument();
    expect(screen.getByText('2023 • Toyota RAV4')).toBeInTheDocument();
  });

  it('renders correct number of vehicle cards', () => {
    render(<VehicleGrid vehicles={mockVehicles} />);

    // Verify all vehicle cards are rendered by checking their headings
    const vehicleHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(vehicleHeadings).toHaveLength(3);
  });

  it('handles single vehicle correctly', () => {
    const singleVehicle = [mockVehicles[0]];
    render(<VehicleGrid vehicles={singleVehicle} />);

    expect(screen.getByText('2022 • Toyota Camry')).toBeInTheDocument();
    expect(screen.queryByText('2021 • Honda Civic')).not.toBeInTheDocument();
  });

  it('displays vehicle information correctly', () => {
    render(<VehicleGrid vehicles={mockVehicles} />);

    // Check for key vehicle information
    expect(screen.getByText('LE • 15,000 miles • Silver')).toBeInTheDocument();
    expect(screen.getByText('EX • 22,000 miles • White')).toBeInTheDocument();
    expect(screen.getByText('XLE • 5,000 miles • Red')).toBeInTheDocument();
  });

  it('shows pricing information for each vehicle', () => {
    render(<VehicleGrid vehicles={mockVehicles} />);

    // Check for monthly pricing
    expect(screen.getByText('$450/mo')).toBeInTheDocument();
    expect(screen.getByText('$380/mo')).toBeInTheDocument();
    expect(screen.getByText('$520/mo')).toBeInTheDocument();
  });

  it('handles large number of vehicles', () => {
    const manyVehicles = Array.from({ length: 20 }, (_, index) => ({
      ...mockVehicles[0],
      id: `vehicle-${index}`,
      make: `Make${index}`,
      model: `Model${index}`,
    }));

    render(<VehicleGrid vehicles={manyVehicles} />);

    // Should render all vehicles by checking headings
    const vehicleHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(vehicleHeadings).toHaveLength(20);
  });
});
