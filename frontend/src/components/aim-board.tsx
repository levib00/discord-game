import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import Target, { ICoordinates } from './target';

interface IAimBoardProps {
  targets: ICoordinates[]
}

// TODO: only allowing undefined targets for prototyping remove later if not needed.

interface IAimBoardProps {
  targets?: ICoordinates[]
}

const AimBoard = (props: IAimBoardProps) => {
  const { targets } = props;

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
      )}
    </div>
  );
};

export default AimBoard;
