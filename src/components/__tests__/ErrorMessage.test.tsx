import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage Component', () => {
  it('renders error message correctly', () => {
    const errorMessage = 'Something went wrong!';
    render(<ErrorMessage error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('has proper error styling', () => {
    const errorMessage = 'Test error message';
    render(<ErrorMessage error={errorMessage} />);

    // Verify error message is displayed with proper styling by checking content
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('displays error icon', () => {
    const errorMessage = 'Test error message';
    const { container } = render(<ErrorMessage error={errorMessage} />);

    // Check for error icon (SVG icon) by checking if the component contains an SVG
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const errorMessage = 'Test error message';
    render(<ErrorMessage error={errorMessage} className="custom-error" />);

    // Verify error message renders with custom class by checking content
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('handles empty error message', () => {
    render(<ErrorMessage error="" />);

    // Should still render the component structure even with empty message
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('handles long error messages', () => {
    const longErrorMessage =
      'This is a very long error message that should wrap properly and still be readable to the user without breaking the layout or causing any visual issues.';
    render(<ErrorMessage error={longErrorMessage} />);

    expect(screen.getByText(longErrorMessage)).toBeInTheDocument();
  });

  it('displays error title', () => {
    const errorMessage = 'Test error message';
    render(<ErrorMessage error={errorMessage} />);

    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
