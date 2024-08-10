import { io } from 'socket.io-client';
import { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendReady } from '../helpers/socket-callbacks';

interface IStartModalProps {
  setLobbyNsp: SetStateAction<any>
  lobbyNsp: ReturnType<typeof io>
  setPlayerId: React.Dispatch<React.SetStateAction<string>>
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
  setIsGameReady: React.Dispatch<React.SetStateAction<boolean>>
}

const StartModal = (props: IStartModalProps) => {
  const {
    setLobbyNsp,
    lobbyNsp,
    setPlayerId,
    setIsConnected,
    setIsGameReady,
  } = props;
  const [lobbyCode] = useState(useParams().lobbyId);

  const readyButtonHandler = async () => {
    if (!lobbyNsp?.connected) {
      setLobbyNsp(io(`http://localhost:8082/${lobbyCode}`));
    }
  };

  useEffect(() => {
    if (lobbyNsp) {
      lobbyNsp.on('ready', () => {
        sendReady(setPlayerId, lobbyNsp);
        setIsConnected(true);
      });

      lobbyNsp.on('bothReady', () => {
        setIsGameReady(true);
      });
    }
  });

  return (
    <div>
      <button onClick={readyButtonHandler}>Ready!</button>
    </div>
  );
};

export default StartModal;
