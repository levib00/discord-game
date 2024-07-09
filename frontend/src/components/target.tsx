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
}

const Target = (props: ITargetProps) => {
  const {
    target,
    index,
    setCurrentTargets,
    currentTargets,
    targetClicked,
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
    <div style={{
      position: 'absolute',
      left: xCoords + 460,
      top: yCoords + 60,
      backgroundColor: 'red',
      width: '60px',
      height: '60px',
      borderRadius: '60px',
    }} data-testid='target'
    onClick={handleTargetClicked}
    >

    </div>
  );
};

export default Target;
