# FlexCar Assignment React

A modern React application built with TypeScript, Tailwind CSS, and comprehensive testing setup.

## Features

- **React 19** - Latest version with improved performance
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Jest & React Testing Library** - Comprehensive testing setup
- **Responsive Design** - Mobile-first approach
- **Modern Tooling** - ESLint, Prettier, and more

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

### Development

1. Start the development server:

   ```bash
   npm start
   ```

2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

3. Run tests:
   ```bash
   npm test
   ```

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
├── App.tsx             # Main application component
├── App.test.tsx        # App component tests
├── index.tsx           # Application entry point
├── index.css           # Global styles with Tailwind
└── setupTests.ts       # Test configuration
```

## Tailwind CSS

This project uses Tailwind CSS for styling. The configuration is set up in `tailwind.config.js` and includes:

- Responsive design utilities
- Custom color palette
- Component-based styling
- Utility-first approach

## Testing

The project includes comprehensive testing setup:

- **Jest** - JavaScript testing framework
- **React Testing Library** - React component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers

Example test:

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './components/Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

## Responsive Design

The application is built with a mobile-first approach using Tailwind CSS responsive utilities:

- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large screens (1280px+)
