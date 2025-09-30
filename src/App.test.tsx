import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Welcome to Your/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders feature cards', () => {
  render(<App />);
  const reactCard = screen.getByText('React 19');
  const typescriptCard = screen.getByText('TypeScript');
  const tailwindCard = screen.getByText('Tailwind CSS');

  expect(reactCard).toBeInTheDocument();
  expect(typescriptCard).toBeInTheDocument();
  expect(tailwindCard).toBeInTheDocument();
});

test('renders call-to-action buttons', () => {
  render(<App />);
  const getStartedButton = screen.getByText('Get Started');
  const viewDocsButton = screen.getByText('View Documentation');

  expect(getStartedButton).toBeInTheDocument();
  expect(viewDocsButton).toBeInTheDocument();
});
