import { useEffect, useState } from 'react';
import AimBoard from './aim-board';
import ScoreBoard from './score-board';
import StartModal from './start-modal';
import { getTargets } from '../helpers/fetchers';

const GameScreen = () => {
  const [targets, setTargets] = useState([]);
  const [score, setScore] = useState(0);
  const [lobbyNsp, setLobbyNsp] = useState<any>();

  useEffect(() => {
    (async () => {
      const test = await getTargets('http://localhost:8082/api/game/targets');
      setTargets(await test);
    })();
  }, []);

  return (
    <div data-testid='game-screen'>
      <ScoreBoard player1Score={score} player2Score={0}/>
      <StartModal lobbyNsp={lobbyNsp} setLobbyNsp={setLobbyNsp} />
      {targets?.length > 0 && <AimBoard
        lobbyNsp={lobbyNsp}
        targets={targets}
        setScore={setScore}
        score={score}
      />}
    </div>
  );
};

export default GameScreen;
