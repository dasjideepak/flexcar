import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  it('renders card with title and description', () => {
    render(<Card title="Test Title" description="Test description" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(
      <Card title="Test Title" description="Test description" icon="🎨" />
    );

    expect(screen.getByText('🎨')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Card
        title="Test Title"
        description="Test description"
        className="custom-card"
      />
    );

    const card = screen.getByText('Test Title').closest('div');
    expect(card).toHaveClass('custom-card');
  });

  it('has proper structure with title as heading', () => {
    render(<Card title="Test Title" description="Test description" />);

    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveTextContent('Test Title');
  });
});
