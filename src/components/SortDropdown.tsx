import React, { useState, useRef, useEffect } from 'react';
import { SortType } from '../types/vehicle';
import { ChevronDown, Check } from 'lucide-react';

interface SortDropdownProps {
  sortType: SortType;
  onSortChange: (sortType: SortType) => void;
  className?: string;
}

const sortOptions = [
  { value: 'popularity' as SortType, label: 'Popularity' },
  { value: 'price-low' as SortType, label: 'Price: Low to high' },
  { value: 'price-high' as SortType, label: 'Price: High to low' },
  { value: 'recently-added' as SortType, label: 'Recently added' },
  { value: 'earliest-available' as SortType, label: 'Earliest available' },
];

export const SortDropdown: React.FC<SortDropdownProps> = ({
  sortType,
  onSortChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = sortOptions.find(
    (option) => option.value === sortType
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (value: SortType) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 gap-1"
      >
        <span className="text-sm font-medium text-gray-900">
          Sort by <span className="font-bold">{selectedOption?.label}</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
            Sort by
          </div>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                option.value === sortType ? 'bg-gray-50' : ''
              }`}
            >
              <span className="text-sm text-gray-900">{option.label}</span>
              {option.value === sortType && (
                <Check className="w-4 h-4 text-gray-900" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
