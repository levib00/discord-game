import AimBoard from "./aim-board";
import ScoreBoard from "./score-board";
import StartModal from "./start-modal";

const GameScreen = () => {
  
  return (
    <div data-testid='game-screen'>
      <ScoreBoard player1Score={0} player2Score={0}/>
      <StartModal />
      <AimBoard />
    </div>
  );
}

export default GameScreen;
