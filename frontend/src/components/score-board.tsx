import React, { useEffect, useState } from 'react';
import { updateScores } from '../helpers/socket-callbacks';
import Countdown from './countdown';

interface IScoreBoard {
  player1Score: number
  lobbyNsp: any
  playerId: string
  isTimerDone: boolean
  setIsGameDone: React.Dispatch<React.SetStateAction<boolean>>
}

const ScoreBoard = (props: IScoreBoard) => {
  const { lobbyNsp, setIsGameDone, isTimerDone } = props;

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
    <div className='scoreboard'>
      <div className='score'>
        Player 1: {player1Score}
      </div>
      <div>
        <Countdown
          setIsTimerDone={setIsGameDone}
          startNumber={60}
          timerShouldStart={isTimerDone}
        />
      </div>
      <div className='score'>
        Player 2: {player2Score}
      </div>
    </div>
  );
};

export default ScoreBoard;
