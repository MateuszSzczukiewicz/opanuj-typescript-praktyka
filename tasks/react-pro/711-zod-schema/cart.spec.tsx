import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils';
import App from './App.tsx';

const PAGE_SELECTORS = {
  ADD_ITEM_BUTTON: 'add-item-button',
  SUBMIT_BUTTON: 'submit-button',
  TOTAL_ERROR: 'total-error',
  ITEMS_ERROR: 'items-error',
  SUBMITTED_MESSAGE: 'submitted-message',
  ITEM_ID: 'item-id',
  ITEM_NAME: 'item-name',
  ITEM_PRICE: 'item-price',
  ITEM_QUANTITY: 'item-quantity',
};

describe('Cart Form with Zod', () => {
  test('should compile', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('should validate empty cart', async () => {
    render(<App />);
    const submitButton = await screen.findByTestId(PAGE_SELECTORS.SUBMIT_BUTTON);
    await userEvent.click(submitButton);
    expect(screen.getByText('Koszyk nie może być pusty')).toBeInTheDocument();
  });

  test('should validate total greater than 0', async () => {
    render(<App />);
    const addItemButton = await screen.findByTestId(PAGE_SELECTORS.ADD_ITEM_BUTTON);
    await userEvent.click(addItemButton);
    const submitButton = await screen.findByTestId(PAGE_SELECTORS.SUBMIT_BUTTON);
    await userEvent.click(submitButton);
    expect(screen.getByText('Łączna cena musi być większa od 0')).toBeInTheDocument();
  });

  test('should confirm correct data submission', async () => {
    render(<App />);
    const addItemButton = await screen.findByTestId(PAGE_SELECTORS.ADD_ITEM_BUTTON);
    await userEvent.click(addItemButton);

    const itemName = await screen.findByTestId(PAGE_SELECTORS.ITEM_NAME);
    const itemPrice = await screen.findByTestId(PAGE_SELECTORS.ITEM_PRICE);
    const itemQuantity = await screen.findByTestId(PAGE_SELECTORS.ITEM_QUANTITY);

    await userEvent.type(itemName, 'Test');
    await userEvent.type(itemPrice, '100');
    await userEvent.type(itemQuantity, '2');

    const submitButton = await screen.findByTestId(PAGE_SELECTORS.SUBMIT_BUTTON);
    await userEvent.click(submitButton);

    expect(
      screen.queryByText('Łączna cena nie zgadza się z wartością produktów'),
    ).not.toBeInTheDocument();
    expect(screen.getByText('Koszyk został wysłany!')).toBeInTheDocument();
  });
});
