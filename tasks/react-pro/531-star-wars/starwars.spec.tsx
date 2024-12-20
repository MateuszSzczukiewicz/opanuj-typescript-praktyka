import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils';
import { render, screen, waitFor } from '@testing-library/react';
import { setupMockServer } from '../../../utils/vitest/msw';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('Star Wars App', () => {
  const { verifyRequest } = setupMockServer({ logRequest: true });

  test('should compile', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('should fetch initial batch of starships', async () => {
    render(<App />);

    await waitFor(() => screen.getByTestId('next-button'), { timeout: 2000 });

    expect(verifyRequest('https://swapi.dev/api/starships?page=1', 'GET')).toBe(true);
  });

  test('should support pagination', async () => {
    render(<App />);

    await waitFor(() => screen.getByTestId('next-button'), { timeout: 2000 });
    await userEvent.click(screen.getByTestId('next-button'));

    expect(verifyRequest('https://swapi.dev/api/starships?page=1', 'GET')).toBe(true);
    expect(verifyRequest('https://swapi.dev/api/starships?page=2', 'GET')).toBe(true);
  });
});
