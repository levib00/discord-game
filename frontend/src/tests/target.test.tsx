import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Target from '../components/target';

const target = {
  xCoords: 250,
  yCoords: 250,
};

describe('Target renders', () => {
  test('Target renders with correct text', () => {
    render(
      <MemoryRouter>
        <Target target={target}/>
      </MemoryRouter>,
    );

    const targetId = screen.getByTestId('target');
    expect(targetId).toBeInTheDocument();
  });
});
