import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { io } from 'socket.io-client';
import userEvent from '@testing-library/user-event';
import StartModal from '../components/start-modal';

describe('Start Modal renders', () => {
  let setLobbyNspMock: jest.Mock;
  let emitMock: jest.Mock;
  const setPlayerId = jest.fn();
  const setIsConnected = jest.fn();

  beforeEach(() => {
    setLobbyNspMock = jest.fn();
    emitMock = jest.fn();
  });

  jest.mock('socket.io-client', () => {
    const mSocket = {
      emit: emitMock,
    };
    return jest.fn(() => mSocket);
  });

  test('start modal renders', () => {
    render(
      <MemoryRouter>
        <StartModal
          setIsConnected={setIsConnected}
          setPlayerId={setPlayerId}
          lobbyNsp={io()}
          setLobbyNsp={jest.fn()}
          setIsGameReady={jest.fn()}
        />
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
        <StartModal
          setIsConnected={setIsConnected}
          setPlayerId={setPlayerId}
          lobbyNsp={mockSocket}
          setLobbyNsp={setLobbyNspMock}
          setIsGameReady={jest.fn()}
          />
      </MemoryRouter>,
    );

    const target = screen.getByRole('button');
    await userEvent.click(target);
    expect(setLobbyNspMock).toHaveBeenCalledTimes(1);
  });

  test('Lobby does not send ready or connect to namespace if already connected and ready button is pressed again', async () => {
    const ENDPOINT = 'localhost:5000';
    const mockSocket = io(ENDPOINT);
    mockSocket.connected = true;

    render(
      <MemoryRouter>
        <StartModal
          setIsConnected={setIsConnected}
          setPlayerId={setPlayerId}
          lobbyNsp={mockSocket}
          setLobbyNsp={setLobbyNspMock}
          setIsGameReady={jest.fn()}
        />
      </MemoryRouter>,
    );

    const target = screen.getByRole('button');
    await userEvent.click(target);
    expect(setLobbyNspMock).not.toHaveBeenCalled();
  });
});
