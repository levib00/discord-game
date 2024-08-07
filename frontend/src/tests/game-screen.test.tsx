import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GameScreen from '../components/game-screen';
import * as getTargets from '../helpers/fetchers';

const queryClient = new QueryClient();

describe('GameScreen', () => {
  const setIsConnectedMock = jest.fn();
  test('Gamescreen renders', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <GameScreen isConnected={false} setIsConnected={setIsConnectedMock} />
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
          <GameScreen isConnected={true} setIsConnected={setIsConnectedMock} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const aimboard = screen.queryByTestId('aim-board');
    expect(aimboard).not.toBeInTheDocument();
  });

  test('Aimboard does not renders if there are targets', async () => {
    jest.spyOn(getTargets, 'getTargets').mockResolvedValue([{
      xCoords: 250,
      yCoords: 250,
    }]);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <GameScreen isConnected={true} setIsConnected={setIsConnectedMock} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const exampleName1 = screen.getByTestId('aim-board');
      expect(exampleName1).toBeInTheDocument();
    });
  });
});
