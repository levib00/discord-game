import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import Target, { ICoordinates } from './target';
import socketio from '../socketio';

interface IAimBoardProps {
  targets: ICoordinates[]
  setScore: any
  score: number
}

let targetScore: number = 1000;

let startTimeMS = 0;
let timerId: ReturnType<typeof setTimeout>;
const timerStep = 1000;

const AimBoard = (props: IAimBoardProps) => {
  const { targets, setScore, score } = props;
  const [jwt] = useState(localStorage.getItem('jwt') || '');

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

  const sendScore = async (newScore: number, authJwt: string) => {
    socketio.emit('score', { newScore, jwt: authJwt });
  };

  const targetClicked = () => {
    targetScore = getRemainingTime();
    restartTimer();
    if (score < 1) {
      targetScore = 0;
    }
    targetScore += 100;
    sendScore(score, jwt || '');
    setScore(score + targetScore);
  };

  const [currentTargets, setCurrentTargets] = useState<ICoordinates[]>(targets || []);

  return (
  <div data-testid='aim-board' className='aim-board'>
      {currentTargets?.length > 0 && currentTargets.slice(0, 3).map(
        (target, index) => <Target
        key={uuidv4()}
        target={ target }
        currentTargets={ currentTargets }
        setCurrentTargets={ setCurrentTargets }
        index={ index }
        targetClicked={targetClicked}/>,
      )}
    </div>
  );
};

export default AimBoard;
