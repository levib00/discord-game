import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { io } from 'socket.io-client';
import userEvent from '@testing-library/user-event';
import StartModal from '../components/start-modal';

describe('Start Modal renders', () => {
  const setLobbyNspMock = jest.fn();
  const emitMock = jest.fn();

  jest.mock('socket.io-client', () => {
    const mSocket = {
      emit: emitMock,
    };
    return jest.fn(() => mSocket);
  });

  test('start modal renders', () => {
    render(
      <MemoryRouter>
        <StartModal lobbyNsp={io()} setLobbyNsp={jest.fn()} />
      </MemoryRouter>,
    );

    const readyButton = screen.getByRole('button', { name: 'Ready!' });
    expect(readyButton).toBeInTheDocument();
  });

  test('Start modal ready button fires function', async () => {
    const ENDPOINT = 'localhost:5000';
    const mockSocket = io(ENDPOINT);

    render(
      <MemoryRouter>
        <StartModal lobbyNsp={mockSocket} setLobbyNsp={setLobbyNspMock} />
      </MemoryRouter>,
    );

    const target = screen.getByRole('button');
    await userEvent.click(target);
    expect(setLobbyNspMock).toHaveBeenCalledTimes(1);
  });
});
