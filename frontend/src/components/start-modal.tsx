import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendReady } from '../helpers/socket-callbacks';

interface IStartModalProps {
  setLobbyNsp: React.Dispatch<React.SetStateAction<any>>
  lobbyNsp: ReturnType<typeof io>
  setPlayerId: React.Dispatch<React.SetStateAction<string>>
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
  setIsGameReady: React.Dispatch<React.SetStateAction<boolean>>
  playerId: string
}

const StartModal = (props: IStartModalProps) => {
  const {
    setLobbyNsp,
    lobbyNsp,
    playerId,
    setPlayerId,
    setIsGameReady,
  } = props;
  const [lobbyCode] = useState(useParams().lobbyId);

  const readyButtonHandler = async () => {
    if (lobbyNsp?.connected && !playerId) {
      sendReady(setPlayerId, lobbyNsp);
    }
  };

  useEffect(() => {
    if (!lobbyNsp) {
      setLobbyNsp(io(`http://localhost:8082?lobbyId=${lobbyCode}`));
    }
  }, []);

  useEffect(() => {
    if (lobbyNsp) {
      lobbyNsp.on('bothReady', () => {
        setIsGameReady(true);
      });
    }
  }, [lobbyNsp]);

  return (
    <div>
      <button onClick={readyButtonHandler}>Ready!</button>
    </div>
  );
};

export default StartModal;
