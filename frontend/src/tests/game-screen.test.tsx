import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GameScreen from '../components/game-screen';
import * as getTargets from '../helpers/fetchers';

const queryClient = new QueryClient();

describe('GameScreen', () => {
  const setIsConnectedToNspMock = jest.fn();
  const setIsGameReadyMock = jest.fn();
  test('Gamescreen renders', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <GameScreen
            isGameReady={false}
            setIsGameReady={setIsGameReadyMock}
            isConnectedToNsp={false}
            setIsConnectedToNsp={setIsConnectedToNspMock}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const gameScreenTitle = screen.getByTestId('game-screen');
    expect(gameScreenTitle).toBeInTheDocument();
  });

  test('Aimboard does not render if there are no targets', () => {
    jest.spyOn(getTargets, 'getTargets').mockResolvedValue(() => []);
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <GameScreen
            isGameReady={false}
            setIsGameReady={setIsGameReadyMock}
            isConnectedToNsp={true}
            setIsConnectedToNsp={setIsConnectedToNspMock}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const aimboard = screen.queryByTestId('aim-board');
    expect(aimboard).not.toBeInTheDocument();
  });

  test('Aimboard does not renders if game is not ready', async () => {
    jest.spyOn(getTargets, 'getTargets').mockResolvedValue([{
      xCoords: 250,
      yCoords: 250,
    }]);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <GameScreen
            isGameReady={false}
            setIsGameReady={setIsGameReadyMock}
            isConnectedToNsp={true}
            setIsConnectedToNsp={setIsConnectedToNspMock}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const waitingForOpponents = screen.getByText('Waiting for opponent...');
      expect(waitingForOpponents).toBeInTheDocument();
    });
  });

  test('Aimboard does not renders if game is not ready', async () => {
    jest.spyOn(getTargets, 'getTargets').mockResolvedValue([{
      xCoords: 250,
      yCoords: 250,
    }]);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <GameScreen
            isGameReady={true}
            setIsGameReady={setIsGameReadyMock}
            isConnectedToNsp={true}
            setIsConnectedToNsp={setIsConnectedToNspMock}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const aimboard = screen.getByTestId('aim-board');
      expect(aimboard).toBeInTheDocument();
    });
  });
});
