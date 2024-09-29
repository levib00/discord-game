import asyncHandler from 'express-async-handler';
import { v4 as uuid } from 'uuid';
import { Request, Response } from 'express';

const socket = require('../src/socketio');

const { addLobbyToList, roomVariables } = socket;

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
  const roomLink = uuid();
  addLobbyToList(roomLink);
  res.json(`${roomLink}`);
});

export const checkIfLobbyExists = asyncHandler(async (req: Request, res: Response) => {
  if (roomVariables[req.params.lobbyId]) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
