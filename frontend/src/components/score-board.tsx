interface IScoreBoard {
  player1Score: number
  player2Score: number
}

const ScoreBoard = (props: IScoreBoard) => {
  const { player1Score, player2Score } = props;

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
