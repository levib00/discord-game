import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

export default asyncHandler(async (req: Request, res: Response) => {
  const result = await req.app.locals.sql('select version()');
  console.log(result);
  res.json('Hello world!');
});
