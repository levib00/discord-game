import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ScoreBoard from '../components/score-board';

describe('Score Board renders', () => {
  test('Target renders with correct text', () => {
    render(
      <MemoryRouter>
        <ScoreBoard player1Score={0} player2Score={0} />
      </MemoryRouter>,
    );

    const player1Score = screen.getByText('Player 1: 0');
    expect(player1Score).toBeInTheDocument();
    const player2Score = screen.getByText('Player 2: 0');
    expect(player2Score).toBeInTheDocument();
  });
});
