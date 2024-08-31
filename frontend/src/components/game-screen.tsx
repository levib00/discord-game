import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import AimBoard from './aim-board';
import ScoreBoard from './score-board';
import StartModal from './start-modal';
import { checkLobbyExists, getTargets } from '../helpers/fetchers';

interface IGameScreenProps {
  isConnectedToNsp: boolean
  setIsConnectedToNsp: React.Dispatch<React.SetStateAction<boolean>>
  isGameReady: boolean
  setIsGameReady: React.Dispatch<React.SetStateAction<boolean>>
}

const GameScreen = (props: IGameScreenProps) => {
  const {
    isConnectedToNsp,
    setIsConnectedToNsp,
    isGameReady,
    setIsGameReady,
  } = props;
  const [score, setScore] = useState(0);
  const [lobbyNsp, setLobbyNsp] = useState<any>();
  const [playerId, setPlayerId] = useState<string>('');
  const [isTimerDone, setIsTimerDone] = useState(false);
  const { lobbyId } = useParams();

  const {
    isPending: isPendingLobbyCheck, data: isLobbyExists, isError: isLobbyError,
  } = useQuery({
    queryKey: ['lobbyCheck'],
    queryFn: async () => {
      const response = await checkLobbyExists(`http://localhost:8082/api/game/check-lobby/${lobbyId}`);
      console.log(response);
      return response;
    },
  });

  const {
    isPending: isPendingTargets, data: targets,
  } = useQuery({
    queryKey: ['targets'],
    queryFn: async () => {
      const response = await getTargets('http://localhost:8082/api/game/targets');
      return response;
    },
    enabled: !!isLobbyExists,
    retry: !!isLobbyExists,
  });

  return (
    <div data-testid='game-screen'>
      {(isPendingLobbyCheck) ? <>Loading...</> : <>
      { isLobbyExists || isLobbyError ? <>
        {isPendingTargets ? <>Loading...</> : <>
          {(targets?.length > 0 && isConnectedToNsp && isGameReady) && <ScoreBoard
            player1Score={score}
            playerId={playerId}
            lobbyNsp={lobbyNsp}
          />}
          {(isConnectedToNsp && !isGameReady) && <>Waiting for opponent...</>}
          {((!isConnectedToNsp && !isGameReady) && (!isPendingLobbyCheck && !isPendingTargets))
            && <StartModal
              lobbyNsp={lobbyNsp}
              setLobbyNsp={setLobbyNsp}
              setPlayerId={setPlayerId}
              setIsConnected={setIsConnectedToNsp}
              setIsGameReady={setIsGameReady}
            />}
          {(targets?.length > 0 && isConnectedToNsp && isGameReady) && <AimBoard
            lobbyNsp={lobbyNsp}
            targets={targets}
            setScore={setScore}
            score={score}
            playerId={playerId}
            isTimerDone={isTimerDone}
            setIsTimerDone={setIsTimerDone}
          /> }
          </>
        }
      </> : <>This lobby does not exist.</>}
      </>}
    </div>
  );
};

export default GameScreen;
