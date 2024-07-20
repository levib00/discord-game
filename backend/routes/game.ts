import express from 'express';
import { getTargets, getChallengeLink } from '../controllers/game-controller';

const router = express.Router();

/* GET home page. */
router.get('/targets', getTargets);

router.get('/link', getChallengeLink);

export default router;
