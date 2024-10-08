import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { io } from 'socket.io-client';
import Target, { ICoordinates } from './target';
import Countdown from './countdown';

interface IAimBoardProps {
  targets: ICoordinates[]
  setScore: any
  score: number
  lobbyNsp: ReturnType<typeof io>
  playerId: string
  isTimerDone: boolean
  setIsTimerDone: React.Dispatch<React.SetStateAction<boolean>>
}

let targetScore: number = 1000;

let startTimeMS = 0;
let timerId: ReturnType<typeof setTimeout>;
const timerStep = 1000;

const AimBoard = (props: IAimBoardProps) => {
  const {
    targets,
    setScore,
    score,
    lobbyNsp,
    playerId,
    isTimerDone,
    setIsTimerDone,
  } = props;

  function startTimer() {
    startTimeMS = (new Date()).getTime();
    timerId = setTimeout(() => {}, timerStep);
  }

  function getRemainingTime() {
    return timerStep - ((new Date()).getTime() - startTimeMS);
  }

  const restartTimer = () => {
    clearTimeout(timerId);
    startTimer();
  };

  const sendScore = async (newScore: number, sentPlayerId: string) => {
    lobbyNsp.emit('score', { newScore, playerId: sentPlayerId });
  };

  const targetClicked = () => {
    targetScore = getRemainingTime();
    restartTimer();
    if (targetScore < 1) {
      targetScore = 0;
    }
    targetScore += 100;
    sendScore(targetScore, playerId);
    setScore(score + targetScore);
  };

  const [currentTargets, setCurrentTargets] = useState<ICoordinates[]>(targets || []);

  return (
  <div data-testid='aim-board' className='aim-board'>
      {!isTimerDone && <Countdown
        setIsTimerDone={setIsTimerDone}
        startNumber={5}
        timerShouldStart={true}
      />}
      {currentTargets?.length > 0 && currentTargets.slice(0, 3).map(
        (target, index) => <Target
        key={uuidv4()}
        target={ target }
        currentTargets={ currentTargets }
        setCurrentTargets={ setCurrentTargets }
        index={ index }
        targetClicked={targetClicked}
        isTimerDone={isTimerDone}
        />,
      )}
    </div>
  );
};

export default AimBoard;
