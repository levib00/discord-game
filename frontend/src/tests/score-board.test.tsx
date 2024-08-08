import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ScoreBoard from '../components/score-board';

describe('Score Board renders', () => {
  let emitMock: jest.Mock;
  let onMock: jest.Mock;

  let ioMock: () => {
    emit: jest.Mock,
    on: jest.Mock
  };

  beforeEach(() => {
    emitMock = jest.fn();
    onMock = jest.fn();

    ioMock = () => ({
      emit: emitMock,
      on: onMock,
    });
  });

  test('scoreboard renders with correct text', () => {
    render(
      <MemoryRouter>
        <ScoreBoard player1Score={0} lobbyNsp={ioMock()} playerId='' />
      </MemoryRouter>,
    );

    const player1Score = screen.getByText('Player 1: 0');
    expect(player1Score).toBeInTheDocument();
    const player2Score = screen.getByText('Player 2: 0');
    expect(player2Score).toBeInTheDocument();
  });

  test('Scoreboard fires function to listen for socket score event', () => {
    const nspMock = ioMock();
    render(
      <MemoryRouter>
        <ScoreBoard player1Score={0} lobbyNsp={nspMock} playerId='' />
      </MemoryRouter>,
    );

    expect(onMock).toHaveBeenCalledTimes(1);
  });
});
