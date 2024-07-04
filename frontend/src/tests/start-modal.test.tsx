import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import StartModal from '../components/start-modal';

describe('Start Modal renders', () => {
  test('Target renders with correct text', () => {
    render(
      <MemoryRouter>
        <StartModal />
      </MemoryRouter>,
    );

    const readyButton = screen.getByRole('button', {name: 'Ready!'});
    expect(readyButton).toBeInTheDocument();
  });
});
