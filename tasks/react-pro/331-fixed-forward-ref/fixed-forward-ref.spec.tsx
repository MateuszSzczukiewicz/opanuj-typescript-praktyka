import { fireEvent, render, screen } from '@testing-library/react';
import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import App from './App.tsx';

describe('Fixed forward ref', () => {
  test('should compile without errors', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('should properly display data from the form', async () => {
    render(<App />);

    // Fill out the form
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const ageInput = screen.getByLabelText('Age');
    const occupationSelect = screen.getByLabelText('Occupation');
    const bioInput = screen.getByLabelText('Bio');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(ageInput, { target: { value: '30' } });
    fireEvent.change(occupationSelect, { target: { value: 'developer' } });
    fireEvent.change(bioInput, { target: { value: 'Test bio' } });

    // Submit form
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Verify submitted data is displayed
    const submittedData = screen.getByTestId('submitted-data');
    expect(submittedData).toBeInTheDocument();
    expect(submittedData).toHaveTextContent('John Doe');
    expect(submittedData).toHaveTextContent('john@example.com');
    expect(submittedData).toHaveTextContent('30');
    expect(submittedData).toHaveTextContent('developer');
    expect(submittedData).toHaveTextContent('Test bio');
  });

  test('should prevent adding extra properties to props', async () => {
    const fileContent = await fsPromises.readFile(join(__dirname, 'fixed-forward-ref.ts'), 'utf8');
    const refInferenceGeneric = Buffer.from('52656641747472696275746573', 'hex').toString(); // encoded type to prevent spoiler
    try {
      expect(fileContent.includes(refInferenceGeneric)).toBe(true);
    } catch {
      throw new Error('Function should use special generic type to fix inference of ref');
    }
  });
});
