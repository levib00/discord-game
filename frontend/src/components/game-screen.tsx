import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import AimBoard from './aim-board';
import ScoreBoard from './score-board';
import StartModal from './start-modal';
import { checkLobbyExists, getTargets } from '../helpers/fetchers';
import EndGame from './endgame';

interface IGameScreenProps {
  isConnectedToNsp: boolean
  setIsConnectedToNsp: React.Dispatch<React.SetStateAction<boolean>>
  isGameReady: boolean
  setIsGameReady: React.Dispatch<React.SetStateAction<boolean>>
  lobbyNsp: any
  setLobbyNsp: React.Dispatch<React.SetStateAction<any>>
}

const GameScreen = (props: IGameScreenProps) => {
  const {
    setIsConnectedToNsp,
    isGameReady,
    setIsGameReady,
    lobbyNsp,
    setLobbyNsp,
  } = props;
  const [score, setScore] = useState(0);
  const [playerId, setPlayerId] = useState<string>('');
  const [isTimerDone, setIsTimerDone] = useState(false);
  const [isGameDone, setIsGameDone] = useState(false);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [endScores, setEndScores] = useState();
  const { lobbyId } = useParams();

  const {
    isPending: isPendingLobbyCheck, data: isLobbyExists, isError: isLobbyError,
  } = useQuery({
    queryKey: ['lobbyCheck'],
    queryFn: async () => {
      const response = await checkLobbyExists(`http://localhost:8082/api/game/check-lobby/${lobbyId}`);
      return response;
    },
  });

  const {
    isPending: isPendingTargets, data: targets, refetch: refetchTargets,
  } = useQuery({
    queryKey: ['targets'],
    queryFn: async () => {
      const response = await getTargets('http://localhost:8082/api/game/targets');
      return response;
    },
    enabled: !!isLobbyExists,
    retry: !!isLobbyExists,
  });

  useEffect(() => {
    if (triggerRefetch) {
      refetchTargets();
      setTriggerRefetch(false);
      setIsTimerDone(false);
      setIsGameReady(true);
      setIsGameDone(false);
    }
  }, [triggerRefetch]);

  useEffect(() => {
    if (isGameDone && lobbyNsp) {
      lobbyNsp.emit('endGame');
    }
  }, [lobbyNsp, isGameDone]);

  useEffect(() => {
    if (lobbyNsp) {
      lobbyNsp.on('endScores', (data: any) => { // TODO: fix any
        setEndScores(data.scores);
      });
    }
  }, [lobbyNsp]);

  // TODO: untangle the mess that is this jsx
  return (
    <div data-testid='game-screen' className='game-screen'>
      {isGameDone ? <EndGame
        endScores={ endScores }
        lobbyNsp={ lobbyNsp }
        setTriggerRefetch={setTriggerRefetch}
        playerId={playerId}
      /> : <>
      {(isPendingLobbyCheck) ? <>Loading...</> : <>
      { isLobbyExists || isLobbyError ? <>
        {isPendingTargets ? <>Loading...</> : <>
          {(targets?.length > 0 && isGameReady) && <ScoreBoard
            player1Score={score}
            playerId={playerId}
            lobbyNsp={lobbyNsp}
            isTimerDone={isTimerDone}
            setIsGameDone={setIsGameDone}
          />}
          {(playerId && !isGameReady) && <>Waiting for opponent...</>}
          {((!playerId && !isGameReady) && (!isPendingLobbyCheck && !isPendingTargets))
            && <StartModal
              playerId={playerId}
              lobbyNsp={lobbyNsp}
              setLobbyNsp={setLobbyNsp}
              setPlayerId={setPlayerId}
              setIsConnected={setIsConnectedToNsp}
              setIsGameReady={setIsGameReady}
            />}
          {(targets?.length > 0 && isGameReady && !isGameDone) && <AimBoard
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
      </>
      }
    </div>
  );
};

export default GameScreen;
