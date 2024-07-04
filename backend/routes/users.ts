import express, { Request, Response } from 'express';
import gameController from '../controllers/game';

const router = express.Router();

/* GET users listing. */
router.get('/', (_req: Request, res: Response) => {
  res.send('respond with a resource');
});

router.get('/test', gameController);

export default router;
