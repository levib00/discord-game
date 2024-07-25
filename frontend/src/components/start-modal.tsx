import { io } from 'socket.io-client';
import { SetStateAction, useState } from 'react';
import { useParams } from 'react-router-dom';

interface IStartModalProps {
  setLobbyNsp: SetStateAction<any>
  lobbyNsp: ReturnType<typeof io>
}

const StartModal = (props: IStartModalProps) => {
  const { setLobbyNsp, lobbyNsp } = props;
  const [lobbyCode] = useState(useParams().lobbyId);

  const sendReady = async () => {
    lobbyNsp.emit('ready', lobbyCode);
  };

  const readyButtonHandler = () => {
    if (!lobbyNsp?.connected) {
      setLobbyNsp(io(`http://localhost:8082/${lobbyCode}`));
      sendReady();
    }
  };

  return (
    <div>
      <button onClick={readyButtonHandler}>Ready!</button>
    </div>
  );
};

export default StartModal;
