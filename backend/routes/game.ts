import express from 'express';
import { getTargets, getChallengeLink, checkIfLobbyExists } from '../controllers/game-controller';

const router = express.Router();

/* GET home page. */
router.get('/targets', getTargets);

router.get('/link', getChallengeLink);

router.get('/check-lobby/:lobbyId', checkIfLobbyExists);

export default router;
