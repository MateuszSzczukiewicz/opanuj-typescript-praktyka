import { join } from 'path';
import { describe, test, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils';
import { fireEvent } from '@testing-library/react';
import { screen, render } from '@testing-library/react';
import Survey from './components/Survey';

describe('Form Controls', () => {
  test('should compile', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('should allow to build and submit form', () => {
    const mockSubmit = vi.fn();
    render(
      <Survey onSubmit={mockSubmit}>
        <Survey.ShortAnswer name="name" label="Name" placeholder="Enter name" required />
        <Survey.LongAnswer name="review" label="Review" placeholder="Enter review" required />
        <Survey.Choice
          name="rating"
          label="Rating"
          options={[
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
          ]}
        />
        <Survey.Submit>Submit</Survey.Submit>
      </Survey>,
    );

    const nameInput = screen.getByLabelText('Name');
    const reviewInput = screen.getByLabelText('Review');
    const ratingInput = screen.getByLabelText('Rating');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(reviewInput, { target: { value: 'Great course!' } });
    fireEvent.change(ratingInput, { target: { value: '3' } });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John',
      review: 'Great course!',
      rating: '3',
    });
  });
});
