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

  const setEndMessage = (player1Score: number | undefined, player2Score: number | undefined) => {
    if ((!player1Score && player1Score !== 0) || (!player2Score && player2Score !== 0)) {
      return <>Loading...</>;
    }
    if (player1Score === player2Score) {
      return <>Its a draw!</>;
    }
    if (player1Score > player2Score) {
      return <>player 1 wins!</>;
    }
    if (player2Score > player1Score) {
      return <>player 2 wins!</>;
    }
    return <>Something went wrong.</>;
  };

  return (
    <div className='end-screen'>
      <div>Game Over!</div>
      <div>
        player 1: {endScores?.player1Score}
      </div>
      <div>
        player 2: {endScores?.player2Score}
      </div>
      <div>
        {setEndMessage(endScores?.player1Score, endScores?.player2Score)}
      </div>
      { hasPressedPlayAgain ? <div>
        Waiting for opponent...
      </div> : <button onClick={playAgain} className='play-again-button'>
        Play Again?
       </button>}
    </div>
  );
};

export default EndGame;
