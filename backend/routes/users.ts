import express, { Request, Response } from 'express';
import { test } from '../controllers/game';
const router = express.Router();

/* GET users listing. */
router.get('/', function(_req: Request, res: Response) {
  res.send('respond with a resource');
});

router.get('/test', test)

export default router;
