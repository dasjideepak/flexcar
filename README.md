# FlexCar - Vehicle Search Application

## Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS** for responsive styling
- **Formik & Yup** for form handling and validation
- **Jest & React Testing Library** for comprehensive testing
- **PostCSS & Autoprefixer** for CSS processing

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd flexcar
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running Tests

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

## Project Structure

```
src/
├── components/                    # Reusable UI components
│   ├── __tests__/                # Component unit tests
│   │   ├── Button.test.tsx
│   │   ├── Card.test.tsx
│   │   ├── FilterPanel.test.tsx
│   │   ├── SearchForm.test.tsx
│   │   └── VehicleCard.test.tsx
│   ├── Button.tsx                # Custom button component
│   ├── Card.tsx                  # Generic card component
│   ├── CollapsibleSection.tsx    # Collapsible UI sections
│   ├── ErrorMessage.tsx          # Error display component
│   ├── FilterPanel.tsx           # Desktop filtering interface
│   ├── MobileFilterBar.tsx       # Mobile filter trigger bar
│   ├── MobileFilterModal.tsx     # Mobile filter modal
│   ├── SearchForm.tsx            # ZIP code search form
│   ├── SortDropdown.tsx          # Sorting controls
│   ├── VehicleCard.tsx           # Individual vehicle display
│   ├── VehicleDetailsModal.tsx   # Vehicle detail modal
│   └── VehicleGrid.tsx           # Vehicle grid layout
├── data/                         # Mock data and utilities
│   └── vehicles.ts               # Vehicle data and helper functions
├── types/                        # TypeScript type definitions
│   └── vehicle.ts                # Vehicle and filter interfaces
├── utils/                        # Utility functions
│   ├── __tests__/                # Utility function tests
│   │   └── vehicleUtils.test.ts
│   └── vehicleUtils.ts           # Filtering and sorting logic
├── __tests__/                    # Application-level tests
│   └── App.test.tsx
├── App.tsx                       # Main application component
├── index.tsx                     # Application entry point
└── index.css                     # Global styles
```

## Responsive Design

The application follows a mobile-first approach with dedicated components for different screen sizes:

- **Mobile**: < 640px (sm) - Uses MobileFilterBar and MobileFilterModal
- **Tablet**: 640px - 1024px (md-lg) - Responsive grid layout
- **Desktop**: > 1024px (lg+) - Full sidebar with FilterPanel

## Testing Strategy

- **Unit Tests**: Individual component and utility function testing with Jest
- **Integration Tests**: Component interaction testing with React Testing Library
- **Coverage Reports**: Comprehensive test coverage with detailed reports
- **Mock Data**: Realistic vehicle data for consistent testing

## Available Scripts

- `npm start` - Runs the app in development mode at [http://localhost:3000](http://localhost:3000)
- `npm test` - Launches the test runner in interactive watch mode
- `npm test -- --coverage` - Runs tests with coverage report
- `npm run build` - Builds the app for production to the `build` folder

## Available ZIP Codes

The application includes mock vehicle data distributed across the following ZIP codes:

- **10001** (New York, NY): 15 vehicles
- **90210** (Beverly Hills, CA): 8 vehicles
- **60601** (Chicago, IL): 8 vehicles
- **33101** (Miami, FL): 4 vehicles
- **75201** (Dallas, TX): 4 vehicles
- **98101** (Seattle, WA): 4 vehicles
- **02101** (Boston, MA): 4 vehicles
- **30309** (Atlanta, GA): 4 vehicles

**Total: 50 vehicles**

To test the application, enter any of these ZIP codes in the search form, or leave the field empty to see all vehicles.

## Test Coverage

The project includes comprehensive test coverage for:

- All React components with user interaction testing
- Utility functions with edge case coverage
- Form validation and error handling
- Responsive behavior and accessibility features

Run `npm test -- --coverage` to view detailed coverage reports.
