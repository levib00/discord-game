import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EndGame from '../components/endgame';

describe('AimBoard renders', () => {
  let mockScores: { [key: string]: number };
  beforeEach(() => {
    mockScores = { player1Score: 1, player2Score: 2 };
  });
  test('EndScreen shows scores if they exist', () => {
    render(
      <MemoryRouter>
        <EndGame lobbyNsp={undefined} setTriggerRefetch={jest.fn()} playerId='' endScores={mockScores} />
      </MemoryRouter>,
    );

    const player1Score = screen.getByText('player 1: 1');
    expect(player1Score).toBeInTheDocument();
    const player2Score = screen.getByText('player 2: 2');
    expect(player2Score).toBeInTheDocument();
  });

  test('does not show scores if it doesn\'t have them yet', () => {
    render(
      <MemoryRouter>
        <EndGame lobbyNsp={undefined} setTriggerRefetch={jest.fn()} playerId='' endScores={undefined} />
      </MemoryRouter>,
    );

    const player1Score = screen.getByText('player 1:');
    expect(player1Score).toBeInTheDocument();
    const player2Score = screen.getByText('player 2:');
    expect(player2Score).toBeInTheDocument();
  });
});
