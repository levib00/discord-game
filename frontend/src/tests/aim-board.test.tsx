import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AimBoard from '../components/aim-board';

describe('AimBoard renders', () => {
  test('About renders with correct text', () => {
    render(
      <MemoryRouter>
        <AimBoard />
      </MemoryRouter>,
    );

    const sourceCode = screen.getAllByTestId('aim-board');
    expect(sourceCode).toBeInTheDocument();
  });
});