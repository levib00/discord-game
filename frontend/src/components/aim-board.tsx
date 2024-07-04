import Target from './target'

interface test {
  xCoords: number,
  yCoords: number
}

interface IAimBoardProps {
  targets: test[]
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
