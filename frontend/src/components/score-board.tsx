import { useEffect, useState } from 'react';
import { updateScores } from '../helpers/socket-callbacks';

interface IScoreBoard {
  player1Score: number
  lobbyNsp: any
  playerId: string
}

const ScoreBoard = (props: IScoreBoard) => {
  const { lobbyNsp } = props;

  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);

  // Set other players score. The score the player sees for themself is calculated client side.
  useEffect(() => {
    if (lobbyNsp) {
      lobbyNsp.on('score', (data: any) => {
        updateScores(data, setPlayer1Score, setPlayer2Score);
      });
    }
  }, [lobbyNsp]);

  return (
    <div>
      <div>
        <div>Player 1: {player1Score}</div>
      </div>
      <div>
        <div>Player 2: {player2Score}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
