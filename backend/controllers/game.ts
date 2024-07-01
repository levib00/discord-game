import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import app from '../app';

export const test = asyncHandler(async (_req: Request, res: Response) => {
  const result = await app.locals.sql(`select version()`);
  console.log(result);
  res.json('Hello world!')
});