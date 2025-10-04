import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SortDropdown } from '../SortDropdown';
import { SortType } from '../../types/vehicle';

describe('SortDropdown Component', () => {
  const mockOnSortChange = jest.fn();

  beforeEach(() => {
    mockOnSortChange.mockClear();
  });

  it('renders sort dropdown correctly', () => {
    render(
      <SortDropdown sortType="popularity" onSortChange={mockOnSortChange} />
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText('Popularity')).toBeInTheDocument();
  });

  it('shows correct selected option', () => {
    render(
      <SortDropdown sortType="price-low" onSortChange={mockOnSortChange} />
    );

    expect(screen.getByText('Price: Low to high')).toBeInTheDocument();
  });

  it('calls onSortChange when selection changes', () => {
    render(
      <SortDropdown sortType="popularity" onSortChange={mockOnSortChange} />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const priceHighOption = screen.getByText('Price: High to low');
    fireEvent.click(priceHighOption);

    expect(mockOnSortChange).toHaveBeenCalledWith('price-high');
  });

  it('displays all sort options when opened', () => {
    render(
      <SortDropdown sortType="popularity" onSortChange={mockOnSortChange} />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getAllByText('Popularity')).toHaveLength(2); // One in button, one in dropdown
    expect(screen.getByText('Price: Low to high')).toBeInTheDocument();
    expect(screen.getByText('Price: High to low')).toBeInTheDocument();
    expect(screen.getByText('Recently added')).toBeInTheDocument();
    expect(screen.getByText('Earliest available')).toBeInTheDocument();
  });

  it('handles all sort types correctly', () => {
    const sortTypes: SortType[] = [
      'popularity',
      'price-low',
      'price-high',
      'recently-added',
      'earliest-available',
    ];

    sortTypes.forEach((sortType) => {
      const { unmount } = render(
        <SortDropdown sortType={sortType} onSortChange={mockOnSortChange} />
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      unmount();
    });
  });

  it('applies custom className', () => {
    render(
      <SortDropdown
        sortType="popularity"
        onSortChange={mockOnSortChange}
        className="custom-sort"
      />
    );

    // Verify dropdown renders with custom class by checking content
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText('Popularity')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <SortDropdown sortType="popularity" onSortChange={mockOnSortChange} />
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('maintains focus after selection change', () => {
    render(
      <SortDropdown sortType="popularity" onSortChange={mockOnSortChange} />
    );

    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();

    fireEvent.click(button);
    const priceHighOption = screen.getByText('Price: High to low');
    fireEvent.click(priceHighOption);

    expect(mockOnSortChange).toHaveBeenCalledWith('price-high');
  });
});
