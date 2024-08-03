import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AimBoard from './aim-board';
import ScoreBoard from './score-board';
import StartModal from './start-modal';
import { getTargets } from '../helpers/fetchers';

const GameScreen = () => {
  const [score, setScore] = useState(0);
  const [lobbyNsp, setLobbyNsp] = useState<any>();

  const {
    isPending, data,
  } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await getTargets('http://localhost:8082/api/game/targets');
      return response;
    },
  });

  return (
    <div data-testid='game-screen'>
      <ScoreBoard player1Score={score} player2Score={0}/>
      <StartModal lobbyNsp={lobbyNsp} setLobbyNsp={setLobbyNsp} />
      {data?.length > 0 && <AimBoard
        lobbyNsp={lobbyNsp}
        targets={data}
        setScore={setScore}
        score={score}
      /> }
      {isPending && <>Loading...</>}
    </div>
  );
};

export default GameScreen;
