import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

// eslint-disable-next-line import/prefer-default-export
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
