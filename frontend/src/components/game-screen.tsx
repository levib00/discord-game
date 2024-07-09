import { useEffect, useState } from 'react';
import AimBoard from './aim-board';
import ScoreBoard from './score-board';
import StartModal from './start-modal';

const GameScreen = () => {
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    const getFetcher = async (url: string) => {
      try {
        const data = await fetch(url, {
          method: 'GET',
          // @ts-ignore
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });

        return await data.json();
      } catch (error: any) {
        throw new Error(error);
      }
    };
    (async () => {
      const test = await getFetcher('http://localhost:8082/api/game/targets');
      setTargets(await test);
    })();
  }, []);

  return (
    <div data-testid='game-screen'>
      <ScoreBoard player1Score={0} player2Score={0}/>
      <StartModal />
      {targets?.length > 0 && <AimBoard targets={targets}/>}
    </div>
  );
};

export default GameScreen;
