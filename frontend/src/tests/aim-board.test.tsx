import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { io } from 'socket.io-client';
import AimBoard from '../components/aim-board';

const targets = [{
  xCoords: 250,
  yCoords: 250,
}];

describe('AimBoard renders', () => {
  test('About renders with correct text', () => {
    render(
      <MemoryRouter>
        <AimBoard targets={targets} score={0} lobbyNsp={io()} setScore={jest.fn()}/>
      </MemoryRouter>,
    );

    const aimBoardId = screen.getByTestId('aim-board');
    expect(aimBoardId).toBeInTheDocument();
  });
});
