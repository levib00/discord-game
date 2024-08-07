import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AimBoard from './aim-board';
import ScoreBoard from './score-board';
import StartModal from './start-modal';
import { getTargets } from '../helpers/fetchers';

interface IGameScreenProps {
  isConnectedToNsp: boolean
  setIsConnectedToNsp: React.Dispatch<React.SetStateAction<boolean>>
}

const GameScreen = (props: IGameScreenProps) => {
  const { isConnectedToNsp, setIsConnectedToNsp } = props;
  const [score, setScore] = useState(0);
  const [lobbyNsp, setLobbyNsp] = useState<any>();
  const [playerId, setPlayerId] = useState<string>('');

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
      <ScoreBoard player1Score={score} playerId={playerId} lobbyNsp={lobbyNsp} />
      {!isConnectedToNsp && <StartModal
        lobbyNsp={lobbyNsp}
        setLobbyNsp={setLobbyNsp}
        setPlayerId={setPlayerId}
        setIsConnected={setIsConnectedToNsp}
      />}
      {(data?.length > 0 && isConnectedToNsp) && <AimBoard
        lobbyNsp={lobbyNsp}
        targets={data}
        setScore={setScore}
        score={score}
        playerId={playerId}
      /> }
      {isPending && <>Loading...</>}
    </div>
  );
};

export default GameScreen;
