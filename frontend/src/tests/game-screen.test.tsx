import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import GameScreen from '../components/game-screen';

describe('GameScreen renders', () => {
  test('Target renders with correct text', () => {
    render(
      <MemoryRouter>
        <GameScreen />
      </MemoryRouter>,
    );

    const gameScreenTitle = screen.getByTestId('game-screen');
    expect(gameScreenTitle).toBeInTheDocument();
  });
});
