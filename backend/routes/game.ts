import express from 'express';
import { getTargets, getChallengeLink, checkIfLobbyExists } from '../controllers/game-controller';

const router = express.Router();

router.get('/targets', getTargets);

router.get('/link', getChallengeLink);

router.head('/check-lobby/:lobbyId', checkIfLobbyExists);

export default router;
