import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils';
import App from './App';
import { render } from '@testing-library/react';
import frameworks from './frameworks.json';

describe('Chart', () => {
  test('should compile', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('renders chart correctly', () => {
    render(<App />);
    const chartSvg = document.querySelector('svg.recharts-surface');
    expect(chartSvg).toBeInTheDocument();

    const axisTicks = document.querySelectorAll('.recharts-yAxis g.recharts-cartesian-axis-tick');
    expect(axisTicks).toHaveLength(frameworks.length);
  });
});
