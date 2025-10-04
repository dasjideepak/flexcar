import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock the vehicle data
jest.mock('../data/vehicles', () => ({
  getVehiclesByZipCode: jest.fn(),
  getAllVehicles: jest.fn(),
}));

// Import the mocked functions
import { getVehiclesByZipCode, getAllVehicles } from '../data/vehicles';
const mockGetVehiclesByZipCode = getVehiclesByZipCode as jest.MockedFunction<
  typeof getVehiclesByZipCode
>;
const mockGetAllVehicles = getAllVehicles as jest.MockedFunction<
  typeof getAllVehicles
>;

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders main heading and logo', () => {
    render(<App />);
    const logoElement = screen.getByAltText('FlexCar');
    expect(logoElement).toBeInTheDocument();
  });

  test('renders search form', () => {
    render(<App />);
    const searchForm = screen.getByText('Find Your Perfect Vehicle');
    const zipInput = screen.getByPlaceholderText(
      'Enter ZIP code (e.g., 10001)'
    );
    const searchButton = screen.getByText('Search Vehicles');

    expect(searchForm).toBeInTheDocument();
    expect(zipInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('renders welcome message initially', () => {
    render(<App />);
    // The welcome message is split across elements, so we need to check for the text content
    const welcomeMessage = screen.getByText((content, element) => {
      return element?.textContent === 'Welcome to FlexCar';
    });
    const description = screen.getByText(
      /Enter your ZIP code above to get started/i
    );

    expect(welcomeMessage).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test('performs search and shows results', async () => {
    // Setup mock to return test data
    mockGetVehiclesByZipCode.mockReturnValue([
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
    ]);

    render(<App />);

    const zipInput = screen.getByPlaceholderText(
      'Enter ZIP code (e.g., 10001)'
    );
    const searchButton = screen.getByText('Search Vehicles');

    fireEvent.change(zipInput, { target: { value: '10001' } });
    fireEvent.click(searchButton);

    await waitFor(
      () => {
        expect(screen.getByText('Available Vehicles')).toBeInTheDocument();
        expect(
          screen.getByText('Showing results for ZIP code 10001')
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Check if vehicles are displayed
    expect(screen.getByText('2022 • Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('2021 • Honda Civic')).toBeInTheDocument();
  });

  test('shows error message for invalid ZIP code', async () => {
    // Setup mock to return empty array for invalid ZIP code
    mockGetVehiclesByZipCode.mockReturnValue([]);

    render(<App />);

    const zipInput = screen.getByPlaceholderText(
      'Enter ZIP code (e.g., 10001)'
    );
    const searchButton = screen.getByText('Search Vehicles');

    fireEvent.change(zipInput, { target: { value: '99999' } });
    fireEvent.click(searchButton);

    await waitFor(
      () => {
        expect(
          screen.getByText(/No vehicles found for ZIP code 99999/)
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test('shows loading state during search', async () => {
    // Setup mock to return test data
    mockGetVehiclesByZipCode.mockReturnValue([
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
    ]);

    render(<App />);

    const zipInput = screen.getByPlaceholderText(
      'Enter ZIP code (e.g., 10001)'
    );
    const searchButton = screen.getByText('Search Vehicles');

    fireEvent.change(zipInput, { target: { value: '10001' } });
    fireEvent.click(searchButton);

    // Should show loading state briefly
    await waitFor(() => {
      expect(screen.getByText('Searching...')).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(screen.queryByText('Searching...')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test('displays filter panel and sort dropdown when vehicles are loaded', async () => {
    // Setup mock to return test data
    mockGetVehiclesByZipCode.mockReturnValue([
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
    ]);

    render(<App />);

    const zipInput = screen.getByPlaceholderText(
      'Enter ZIP code (e.g., 10001)'
    );
    const searchButton = screen.getByText('Search Vehicles');

    fireEvent.change(zipInput, { target: { value: '10001' } });
    fireEvent.click(searchButton);

    await waitFor(
      () => {
        expect(screen.getByText('Available Vehicles')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Check for filter panel (desktop)
    expect(screen.getByText('Filters')).toBeInTheDocument();

    // Check for sort dropdown
    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  test('resets filters when new search is performed', async () => {
    // Setup mock to return test data
    mockGetVehiclesByZipCode.mockReturnValue([
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
    ]);

    render(<App />);

    const zipInput = screen.getByPlaceholderText(
      'Enter ZIP code (e.g., 10001)'
    );
    const searchButton = screen.getByText('Search Vehicles');

    // First search
    fireEvent.change(zipInput, { target: { value: '10001' } });
    fireEvent.click(searchButton);

    await waitFor(
      () => {
        expect(screen.getByText('Available Vehicles')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Apply a filter
    const toyotaCheckbox = screen.getByLabelText(/Toyota/);
    fireEvent.click(toyotaCheckbox);

    // Perform another search
    fireEvent.change(zipInput, { target: { value: '10001' } });
    fireEvent.click(searchButton);

    await waitFor(
      () => {
        expect(screen.getByText('Available Vehicles')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Filter should be reset (Toyota checkbox should not be checked)
    // Wait a bit for the filter reset to take effect
    await waitFor(() => {
      const toyotaCheckboxAfter = screen.getByLabelText(/Toyota/);
      expect(toyotaCheckboxAfter).not.toBeChecked();
    });
  });
});
