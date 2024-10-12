export interface ICoordinates {
  xCoords: number,
  yCoords: number
}

interface ITargetProps {
  target: {
    xCoords: number,
    yCoords: number
  },
  setCurrentTargets: React.Dispatch<React.SetStateAction<ICoordinates[]>>,
  index: number,
  currentTargets: ICoordinates[],
  targetClicked: () => void
  isTimerDone: boolean
}

const Target = (props: ITargetProps) => {
  const {
    target,
    index,
    setCurrentTargets,
    currentTargets,
    targetClicked,
    isTimerDone,
  } = props;

  const { xCoords, yCoords } = target;

  const removeThisTarget = () => {
    const currentTargetsCopy = [...currentTargets];
    currentTargetsCopy.splice(index, 1);
    setCurrentTargets(currentTargetsCopy);
  };

  const handleTargetClicked = () => {
    targetClicked();
    removeThisTarget();
  };

  return (
    <>
      {isTimerDone ? <div
        style={{
          position: 'absolute',
          left: xCoords + 456,
          top: yCoords + 197,
          backgroundColor: 'red',
          width: '60px',
          height: '60px',
          borderRadius: '60px',
        }}
        data-testid='target'
        onMouseDown={handleTargetClicked}
      /> : <div
        style={{
          position: 'absolute',
          left: xCoords + 456,
          top: yCoords + 197,
          backgroundColor: 'red',
          width: '60px',
          height: '60px',
          borderRadius: '60px',
        }}
        data-testid='target'
      />
      }
    </>
  );
};

export default Target;
