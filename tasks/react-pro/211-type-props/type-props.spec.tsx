import { render, screen } from '@testing-library/react';
import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import App from './App.tsx';

describe('Type props', () => {
  test('should compile', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('should display default props', async () => {
    // Render the component
    render(<App />);

    // Check initial state
    expect(screen.getByText('Witamy w React Pro!')).toBeInTheDocument();
    expect(screen.getByText('Ciesz się procesem nauki TSa z Reactem 🧑🏻‍💻')).toBeInTheDocument();
  });

  test('should use recommended approach for typing props', async () => {
    const fileContent = await fsPromises.readFile(join(__dirname, 'App.tsx'), 'utf8');
    const notRecommendedType = Buffer.from('46433C', 'hex').toString(); // encoded type to prevent spoiler
    const notRecommendedTypeAlias = Buffer.from(
      '46756E6374696F6E436F6D706F6E656E743C',
      'hex',
    ).toString(); // encoded type to prevent spoiler
    try {
      expect(fileContent.includes(notRecommendedType)).toBe(false);
      expect(fileContent.includes(notRecommendedTypeAlias)).toBe(false);
    } catch {
      throw new Error('Component should use recommended approach from the lesson for typing props');
    }
  });
});
