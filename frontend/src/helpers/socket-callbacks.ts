import { v4 as uuid } from 'uuid';

export const sendReady = (
  setPlayerId: React.Dispatch<React.SetStateAction<string>>,
  lobbyNsp: any,
) => {
  const newPlayerId = uuid();
  setPlayerId(newPlayerId);
  return lobbyNsp.emit('ready', newPlayerId);
};

interface IData {
  scores: {
    player1Score: number
    player2Score: number
  }
  ids: {
    player1Id: string
    player2Id: string
  }
}

export const updateScores = (
  data: IData,
  setPlayer1Score: React.Dispatch<React.SetStateAction<number>>,
  setPlayer2Score: React.Dispatch<React.SetStateAction<number>>,
) => {
  setPlayer1Score(data.scores.player1Score);
  setPlayer2Score(data.scores.player2Score);
};
