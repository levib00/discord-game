import { io } from 'socket.io-client';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import socketio from '../socketio';

const StartModal = () => {
  const [lobbyCode] = useState(useParams().lobbyId);

  const sendReady = async () => {
    socketio.emit('ready', lobbyCode);
  };

  const readyButtonHandler = () => {
    sendReady();
    io(`http://localhost:8082/${lobbyCode}`);
  };

  return (
    <div>
      <button onClick={readyButtonHandler}>Ready!</button>
    </div>
  );
};

export default StartModal;
