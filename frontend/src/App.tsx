import { useEffect, useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GameScreen from './components/game-screen';

function App() {
  const [isDarkMode, setIsDarkMode] = useState<string>('true');

  // Load dark mode
  useEffect(() => {
    (async () => {
      const darkModeStorage = localStorage.getItem('darkMode');
      setIsDarkMode(darkModeStorage || '');
    })();
  }, []);

  return (
    <div className={isDarkMode ? 'top-container dark-mode' : 'top-container'}>
      <MemoryRouter>
        <header>
        </header>
        <main className='main'>
          <Routes>
            <Route path='/' element={<GameScreen />} />
          </Routes>
        </main>
      </MemoryRouter>
    </div>
  );
}

export default App;
