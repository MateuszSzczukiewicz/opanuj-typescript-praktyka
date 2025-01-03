import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { setupMockServer } from '../../../utils/vitest/msw';

describe('Planets Grid System', () => {
  setupMockServer();

  test('should compile', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('renders simple grid', async () => {
    render(<App />);

    const simpleTab = screen.getByTestId('simple-tab');
    await userEvent.click(simpleTab);

    const simpleGrid = screen.getByTestId('simple-grid');
    const planetsGrid = simpleGrid.querySelector('section[data-testid="planets-grid"]');

    expect(planetsGrid).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
  });

  test('renders detailed grid', async () => {
    render(<App />);

    const detailedTab = screen.getByTestId('detailed-tab');
    await userEvent.click(detailedTab);

    const detailedGrid = screen.getByTestId('detailed-grid');
    const planetsGrid = detailedGrid.querySelector('main[data-testid="planets-grid"]');

    expect(planetsGrid).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
  });
});
