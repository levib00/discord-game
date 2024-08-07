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

  let player1Score = 0;
  let player2Score = 0;

  // TODO: move all socketio to own file.
  lobby.on('connection', (socket: any) => {
    let player1Id: string;
    let player2Id: string;

    console.log('someone connected to namespace', socket.id);

    lobby.emit('ready');

    socket.on('ready', (data: any) => {
      if (!player1Id) {
        player1Id = data;
      } else if (!player2Id) {
        player2Id = data;
      }
    });

    socket.on('score', (data: any) => {
      if (data.playerId === player1Id) {
        player1Score += data.newScore;
      } else if (data.playerId === player2Id) {
        player2Score += data.newScore;
      }
      lobby.emit({
        scores: { player1Score, player2Score },
        ids: { player1Id, player2Id },
      });
    });

    console.log(lobby.on);
  });

  res.json(`${link}`);
});
