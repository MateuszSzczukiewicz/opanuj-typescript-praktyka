import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils';
import App from './App';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Text Tooling', () => {
  test('should compile', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('allows text input and applies bold style', async () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText('Wpisz swój tekst...');
    const boldCheckbox = screen.getByLabelText('Bold');

    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'Test text');
    await userEvent.click(boldCheckbox);

    const textFrame = screen.getByTestId('text-frame');
    const boldText = screen.getByTestId('bold');
    expect(boldText).toBeInTheDocument();
    expect(boldText).toHaveTextContent('Test text');
    expect(textFrame).toContainElement(boldText);
  });

  test('allows text input and applies italic style', async () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText('Wpisz swój tekst...');
    const italicCheckbox = screen.getByLabelText('Italic');

    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'Test text');
    await userEvent.click(italicCheckbox);

    const textFrame = screen.getByTestId('text-frame');
    const italicText = screen.getByTestId('italic');
    expect(italicText).toBeInTheDocument();
    expect(italicText).toHaveTextContent('Test text');
    expect(textFrame).toContainElement(italicText);
  });

  test('allows text input and applies rainbow style', async () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText('Wpisz swój tekst...');
    const rainbowCheckbox = screen.getByLabelText('Rainbow');

    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'Test text');
    await userEvent.click(rainbowCheckbox);

    const textFrame = screen.getByTestId('text-frame');
    const rainbowText = screen.getByTestId('rainbow');
    expect(rainbowText).toBeInTheDocument();
    expect(textFrame).toContainElement(rainbowText);
  });

  test('can combine multiple styles', async () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText('Wpisz swój tekst...');
    const boldCheckbox = screen.getByLabelText('Bold');
    const italicCheckbox = screen.getByLabelText('Italic');
    const rainbowCheckbox = screen.getByLabelText('Rainbow');

    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'Test text');
    await userEvent.click(boldCheckbox);
    await userEvent.click(italicCheckbox);
    await userEvent.click(rainbowCheckbox);

    const textFrame = screen.getByTestId('text-frame');
    const boldText = screen.getByTestId('bold');
    const italicText = screen.getByTestId('italic');
    const rainbowText = screen.getByTestId('rainbow');

    expect(boldText).toBeInTheDocument();
    expect(italicText).toBeInTheDocument();
    expect(rainbowText).toBeInTheDocument();
    expect(textFrame).toContainElement(boldText);
    expect(boldText).toContainElement(italicText);
    expect(italicText).toContainElement(rainbowText);
  });
});
