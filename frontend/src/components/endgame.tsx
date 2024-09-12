import { useEffect, useState } from 'react';

interface IEndGame {
  endScores: undefined | {
    [key: string]: number
  }
  lobbyNsp: any
  setTriggerRefetch: React.Dispatch<React.SetStateAction<boolean>>
  playerId: string
}

const EndGame = (props: IEndGame) => {
  const {
    endScores,
    lobbyNsp,
    setTriggerRefetch,
    playerId,
  } = props;

  const [hasPressedPlayAgain, setHasPressedPlayAgain] = useState(false);

  useEffect(() => {
    if (lobbyNsp) {
      lobbyNsp.on('playAgain', () => {
        setTriggerRefetch(true);
      });
    }
  }, [lobbyNsp]);

  const playAgain = () => {
    lobbyNsp.emit('playAgain', playerId);
    setHasPressedPlayAgain(true);
  };

  return (
    <div>
      <div>Game Over!</div>
      <div>
        player 1: {endScores?.player1Score}
      </div>
      <div>
        player 2: {endScores?.player2Score}
      </div>
      { hasPressedPlayAgain ? <div>
        Waiting for opponent...
      </div> : <button onClick={playAgain}>
        Play Again?
       </button>}
    </div>
  );
};

export default EndGame;
