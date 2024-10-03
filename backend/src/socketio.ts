const io = require('socket.io')();

const socketio = {
  io,
};

const roomVariables: any = {};

const deleteLobby = (lobbyId: string) => {
  if (!socketio.io.sockets.adapter.rooms.get(lobbyId) && roomVariables[lobbyId]) {
    delete roomVariables[lobbyId];
  }
};

io.on('connect', (socket: any) => { // TODO: handle player disconnecting and reconnecting
  const { lobbyId } = socket.handshake.query;
  socket.join(lobbyId);
  if (!roomVariables[lobbyId]?.player1Id) {
    roomVariables[lobbyId] = {};
    roomVariables[lobbyId].player1Score = 0;
    roomVariables[lobbyId].player2Score = 0;
  }

  socket.on('disconnect', () => {
    deleteLobby(lobbyId);
  });

  // TODO: deny connection if both playerIds are truthy

  console.log('someone connected to namespace', socket.id);

  socket.on('ready', (data: any) => {
    console.log(roomVariables[lobbyId]);
    if (!roomVariables[lobbyId]?.player1Id) {
      roomVariables[lobbyId].player1Id = data;
      roomVariables[lobbyId].player1IsReady = true;
    } else if (!roomVariables[lobbyId]?.player2Id && data !== roomVariables[lobbyId].player1Id) {
      roomVariables[lobbyId].player2Id = data;
      roomVariables[lobbyId].player2IsReady = true;
    }
    if (roomVariables[lobbyId]?.player1IsReady && roomVariables[lobbyId]?.player2IsReady) {
      socketio.io.to(lobbyId).emit('bothReady');
    }
  });

  socket.on('score', (data: any) => {
    if (data.playerId === roomVariables[lobbyId].player1Id) {
      if (Number.isInteger(roomVariables[lobbyId].player1Score)) {
        roomVariables[lobbyId].player1Score += data.newScore;
      } else {
        roomVariables[lobbyId].player1Score = 0;
      }
    } else if (data.playerId === roomVariables[lobbyId].player2Id) {
      if (Number.isInteger(roomVariables[lobbyId].player2Score)) {
        roomVariables[lobbyId].player2Score += data.newScore;
      } else {
        roomVariables[lobbyId].player2Score = 0;
      }
    }

    socketio.io.to(lobbyId).emit('score', {
      scores: {
        player1Score: roomVariables[lobbyId].player1Score,
        player2Score: roomVariables[lobbyId].player2Score,
      },
      ids: {
        player1Id: roomVariables[lobbyId].player1Id,
        player2Score: roomVariables[lobbyId].player2Id,
      },
    });
  });

  socket.on('endGame', () => {
    socketio.io.to(lobbyId).emit('endScores', {
      scores: {
        player1Score: roomVariables[lobbyId].player1Score,
        player2Score: roomVariables[lobbyId].player2Score,
      },
    });
  });

  socket.on('playAgain', (data: string) => {
    if (data === roomVariables[lobbyId].player1Id) {
      roomVariables[lobbyId].player1PlayAgain = true;
    } else if (data === roomVariables[lobbyId].player2Id) {
      roomVariables[lobbyId].player2PlayAgain = true;
    }
    if (roomVariables[lobbyId].player1PlayAgain && roomVariables[lobbyId].player2PlayAgain) {
      roomVariables[lobbyId].player1Score = 0;
      roomVariables[lobbyId].player2Score = 0;
      roomVariables[lobbyId].player1PlayAgain = false;
      roomVariables[lobbyId].player2PlayAgain = false;
      socketio.io.to(lobbyId).emit('playAgain');
    }
  });
});

const addLobbyToList = (lobbyId: string) => {
  roomVariables[lobbyId] = {};
};

module.exports = { socketio, addLobbyToList, roomVariables };
