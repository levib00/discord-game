import Target from './target';

interface test {
  xCoords: number,
  yCoords: number
}

// TODO: only allowing undefined targets for prototyping remove later if not needed.

interface IAimBoardProps {
  targets?: test[]
}

const AimBoard = (props: IAimBoardProps) => {
  const { targets } = props
  return (
    <div>
      {targets.map(target => <Target target={ target } />)}
    </div>
  );
}

export default AimBoard;
