import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import Target, { ICoordinates } from './target';

interface IAimBoardProps {
  targets: ICoordinates[]
}

let score: number = 1000;

let startTimeMS = 0;
let timerId: ReturnType<typeof setTimeout>;
const timerStep = 1000;

const AimBoard = (props: IAimBoardProps) => {
  const { targets } = props;

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

  const sendScore = async (url: string, newScore: number) => {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newScore),
      credentials: 'include',
      // @ts-ignore
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://levib00.github.io',
      },
      mode: 'cors',
    });
  };

  const targetClicked = () => {
    score = getRemainingTime() + 100;
    sendScore('', score);
    restartTimer();
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
