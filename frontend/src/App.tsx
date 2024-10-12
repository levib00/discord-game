import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import GameScreen from './components/game-screen';
import Nav from './components/nav';
import Home from './components/home';

const queryClient = new QueryClient();

function App() {
  const [isDarkMode, setIsDarkMode] = useState<string>('true');
  const [isConnectedToNsp, setIsConnectedToNsp] = useState<boolean>(false);
  const [isGameReady, setIsGameReady] = useState<boolean>(false);
  const [lobbyNsp, setLobbyNsp] = useState<any>();

  // Load dark mode
  useEffect(() => {
    (async () => {
      const darkModeStorage = localStorage.getItem('darkMode');
      setIsDarkMode(darkModeStorage || '');
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={isDarkMode ? 'top-container dark-mode' : 'top-container'}>
        <BrowserRouter>
          <header>
            <Nav lobbyNsp={lobbyNsp} />
          </header>
          <main className='main'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/challenge/:lobbyId' element={<GameScreen lobbyNsp={lobbyNsp} setLobbyNsp={setLobbyNsp} isGameReady={isGameReady} setIsGameReady={setIsGameReady} isConnectedToNsp={isConnectedToNsp} setIsConnectedToNsp={setIsConnectedToNsp} />} />
            </Routes>
          </main>
        </BrowserRouter>
        <footer></footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
