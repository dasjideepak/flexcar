import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchForm } from '../SearchForm';

describe('SearchForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders the search form correctly', () => {
    render(<SearchForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Find Your Perfect Vehicle')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter ZIP code (e.g., 10001)')
    ).toBeInTheDocument();
    expect(screen.getByText('Search Vehicles')).toBeInTheDocument();
  });

  it('shows loading state when isLoading is true', () => {
    render(<SearchForm onSubmit={mockOnSubmit} isLoading={true} />);

    expect(screen.getByText('Searching...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('validates required ZIP code', async () => {
    render(<SearchForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByText('Search Vehicles');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('ZIP code is required')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates ZIP code format', async () => {
    render(<SearchForm onSubmit={mockOnSubmit} />);

    const zipInput = screen.getByPlaceholderText(
      'Enter ZIP code (e.g., 10001)'
    );
    const submitButton = screen.getByText('Search Vehicles');

    fireEvent.change(zipInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)'
        )
      ).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('accepts valid ZIP code formats', async () => {
    render(<SearchForm onSubmit={mockOnSubmit} />);

    const zipInput = screen.getByPlaceholderText(
      'Enter ZIP code (e.g., 10001)'
    );
    const submitButton = screen.getByText('Search Vehicles');

    fireEvent.change(zipInput, { target: { value: '12345' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        { zipCode: '12345' },
        expect.any(Object)
      );
    });
  });

  it('accepts ZIP+4 format', async () => {
    render(<SearchForm onSubmit={mockOnSubmit} />);

    const zipInput = screen.getByPlaceholderText(
      'Enter ZIP code (e.g., 10001)'
    );
    const submitButton = screen.getByText('Search Vehicles');

    fireEvent.change(zipInput, { target: { value: '12345-6789' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        { zipCode: '12345-6789' },
        expect.any(Object)
      );
    });
  });
});
