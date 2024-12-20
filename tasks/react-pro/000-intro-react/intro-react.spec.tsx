import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import App from './App.tsx';

describe('Intro App', () => {
  test('should compile', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('renders properly', async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(screen.getByText('Current count: 0')).toBeInTheDocument();

    const incrementButton = screen.getByRole('button', { name: /increment/i });
    await user.click(incrementButton);

    expect(screen.getByText('Current count: 1')).toBeInTheDocument();
  });
});
