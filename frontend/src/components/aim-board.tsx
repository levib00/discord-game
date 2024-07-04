import { v4 as uuidv4 } from 'uuid';
import Target from './target';

interface ICoordinates {
  xCoords: number,
  yCoords: number
}

// TODO: only allowing undefined targets for prototyping remove later if not needed.

interface IAimBoardProps {
  targets?: ICoordinates[]
}

const AimBoard = (props: IAimBoardProps) => {
  const { targets } = props;
  return (
    <div data-testid="aim-board">
      {targets?.map((target) => <Target key={uuidv4()} target={ target } />)}
    </div>
  );
};

export default AimBoard;
