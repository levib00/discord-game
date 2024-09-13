import asyncHandler from 'express-async-handler';
import { v4 as uuid } from 'uuid';
import { Request, Response } from 'express';

const socketio = require('../src/socketio');

export const getTargets = asyncHandler(async (_req: Request, res: Response) => {
  const generateTargets = () => {
    const coordsArray = [];

    const generateX = () => Math.floor(Math.random() * 1000);
    const generateY = () => Math.floor(Math.random() * 850);

    for (let i = 0; i < 600; i += 1) {
      const coords = {
        xCoords: generateX(),
        yCoords: generateY(),
      };

      coordsArray.push(coords);
    }
    return coordsArray;
  };

  res.json(generateTargets());
});

export const getChallengeLink = asyncHandler(async (_req: Request, res: Response) => {
  const link = uuid();
  const lobby = socketio.io.of(`/${link}`);

  lobby.player1Score = 0;
  lobby.player2Score = 0;

  // TODO: move all socketio to own file.
  lobby.on('connection', (socket: any) => { // TODO: handle player disconnecting and reconnecting
    lobby.player1Id = '';
    lobby.player2Id = '';
    // TODO: deny connection if both playerIds are truthy

    lobby.player1IsReady = false;
    lobby.player2IsReady = false;

    lobby.player1PlayAgain = false;
    lobby.player2PlayAgain = false;

    console.log('someone connected to namespace', socket.id);

    lobby.emit('ready');

    socket.on('ready', (data: any) => {
      if (!lobby.player1Id) {
        lobby.player1Id = data;
        lobby.player1IsReady = true;
      } else if (!lobby.player2Id) {
        lobby.player2Id = data;
        lobby.player2IsReady = true;
      }
      if (lobby.player1IsReady && lobby.player2IsReady) {
        lobby.emit('bothReady');
      }
    });

    socket.on('score', (data: any) => {
      if (data.playerId === lobby.player1Id) {
        lobby.player1Score += data.newScore;
      } else if (data.playerId === lobby.player2Id) {
        lobby.player2Score += data.newScore;
      }

      lobby.emit('score', {
        scores: { player1Score: lobby.player1Score, player2Score: lobby.player2Score },
        ids: { player1Id: lobby.player1Id, player2Id: lobby.player2Id },
      });
    });

    socket.on('endGame', () => {
      lobby.emit('endScores', {
        scores: { player1Score: lobby.player1Score, player2Score: lobby.player2Score },
      });
    });

    socket.on('playAgain', (data: string) => {
      if (data === lobby.player1Id) {
        lobby.player1PlayAgain = true;
      } else if (data === lobby.player2Id) {
        lobby.player2PlayAgain = true;
      }
      lobby.player1Score = 0;
      lobby.player2Score = 0;

      lobby.player1IsReady = false;
      lobby.player2IsReady = false;

      if (lobby.player1PlayAgain && lobby.player2PlayAgain) {
        lobby.emit('playAgain');
      }
    });
  });

  res.json(`${link}`);
});

export const checkIfLobbyExists = asyncHandler(async (req: Request, res: Response) => {
  // eslint-disable-next-line no-underscore-dangle
  if (socketio.io._nsps.has(`/${req.params.lobbyId}`)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
