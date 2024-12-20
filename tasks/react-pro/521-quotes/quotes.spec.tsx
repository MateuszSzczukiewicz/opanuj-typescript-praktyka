import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils';
import App from './App';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupMockServer } from '../../../utils/vitest/msw';

const SELECTORS = {
  previousPageButton: 'previous-page-button',
  nextPageButton: 'next-page-button',
  quoteGallery: 'quote-gallery',
};

const firstPageRequestUrl = 'https://dummyjson.com/quotes?limit=5&skip=0';
const secondPageRequestUrl = 'https://dummyjson.com/quotes?limit=5&skip=5';

describe('Quote Gallery', () => {
  const { verifyRequest, verifyRequestCount } = setupMockServer();

  test('should compile', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('renders quotes and allows cached pagination', async () => {
    render(<App />);

    await waitFor(
      () => {
        const quoteGallery = screen.getByTestId(SELECTORS.quoteGallery);
        expect(quoteGallery).toBeInTheDocument();
      },
      { timeout: 1000 },
    );

    expect(verifyRequest(firstPageRequestUrl, 'GET')).toBe(true);

    await userEvent.click(screen.getByTestId(SELECTORS.nextPageButton));
    expect(verifyRequest(secondPageRequestUrl, 'GET')).toBe(true);

    // Expect cache to be applied
    await userEvent.click(screen.getByTestId(SELECTORS.previousPageButton));

    expect(verifyRequestCount(firstPageRequestUrl, 'GET')).toBe(1);

    //   // Advance time beyond cache limit
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10 * 1000);
      await userEvent.click(screen.getByTestId(SELECTORS.nextPageButton));
    });
    expect(verifyRequestCount(secondPageRequestUrl, 'GET')).toBe(2);

    await userEvent.click(screen.getByTestId(SELECTORS.previousPageButton));
    expect(verifyRequestCount(firstPageRequestUrl, 'GET')).toBe(2);
  });

  test('disables previous button on first page', async () => {
    render(<App />);
    await screen.findByText('Quote Gallery');

    const prevButton = screen.getByTestId(SELECTORS.previousPageButton);
    expect(prevButton).toBeDisabled();
  });
});
