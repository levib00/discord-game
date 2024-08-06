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

  lobby.on('connection', (socket: any) => {
    // TODO: When actual logic gets written for this
    // TODO: put it in helper function file for easier testing.
    console.log('someone connected to namespace', socket.id);

    socket.on('ready', (data: any) => {
      console.log('ready');
      lobby.emit(data);
    });

    socket.on('score', (data: any) => {
      console.log(data);
      player1Score += 1;
      player2Score += 1;
      console.log({ scores: { player1Score, player2Score } });
    });

    console.log(lobby.on);
  });

  res.json(`${link}`);
});
