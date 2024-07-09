import express from 'express';
import { getTargets } from '../controllers/game-controller';

const router = express.Router();

/* GET home page. */
router.get('/targets', getTargets);

export default router;
