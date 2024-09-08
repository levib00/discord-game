interface IEndGame {
  endScores: undefined | {
    [key: string]: number
  }
}

const EndGame = (props: IEndGame) => {
  const { endScores } = props;

  return (
    <div>
      <div>Game Over!</div>
      <div>
        player 1: {endScores?.player1Score}
      </div>
      <div>
        player 2: {endScores?.player2Score}
      </div>
    </div>
  );
};

export default EndGame;
