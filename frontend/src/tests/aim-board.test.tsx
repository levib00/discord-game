import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { io } from 'socket.io-client';
import userEvent from '@testing-library/user-event';
import AimBoard from '../components/aim-board';

const targets = [{
  xCoords: 250,
  yCoords: 250,
}];

describe('AimBoard renders', () => {
  const emitMock = jest.fn();

  test('About renders with correct text', () => {
    render(
      <MemoryRouter>
        <AimBoard isTimerDone={true} setIsTimerDone={jest.fn()} playerId={''} targets={targets} score={0} lobbyNsp={io()} setScore={jest.fn()}/>
      </MemoryRouter>,
    );

    const aimBoardId = screen.getByTestId('aim-board');
    expect(aimBoardId).toBeInTheDocument();
  });

  test('Clicking target runs correct function', async () => {
    const ioMock = () => ({ emit: emitMock });

    render(
      <MemoryRouter>
        {/* @ts-ignore */}
        <AimBoard isTimerDone={true} setIsTimerDone={jest.fn()} playerId={''} targets={targets} score={0} lobbyNsp={ioMock()} setScore={jest.fn()}/>
      </MemoryRouter>,
    );

    const target = screen.getByTestId('target');
    await userEvent.click(target);
    expect(emitMock).toHaveBeenCalledWith('score', { playerId: '', newScore: 100 });
  });
});
