// src/components/Button/Button.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('renders primary button with text', () => {
    const { getByText } = render(<Button primary label="Primary Button" />);
    expect(getByText('Primary Button')).toBeInTheDocument();
  });

  test('renders secondary button with text', () => {
    const { getByText } = render(
      <Button primary={false} label="Secondary Button" />
    );
    expect(getByText('Secondary Button')).toBeInTheDocument();
  });

  test('renders icon only button', () => {
    const testIcon = <i data-testid="icon" className="fas fa-plus"></i>;
    const { getByTestId } = render(<Button primary iconOnly icon={testIcon} />);
    expect(getByTestId('icon')).toBeInTheDocument();
  });

  test('renders button with icon and text', () => {
    const testIcon = <i data-testid="icon" className="fas fa-check"></i>;
    const { getByText, getByTestId } = render(
      <Button primary label="Button with Icon" icon={testIcon} />
    );
    expect(getByText('Button with Icon')).toBeInTheDocument();
    expect(getByTestId('icon')).toBeInTheDocument();
  });

  test('handles click event', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button primary label="Click me" onClick={handleClick} />
    );
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
