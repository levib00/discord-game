interface ITargetProps {
  target: {
    xCoords: number,
    yCoords: number
  }
}

const Target = (props: ITargetProps) => {
  const {xCoords, yCoords} = props.target;
  
  return (
    <div style={{position: 'relative', left: xCoords, top: yCoords}} data-testid='target'>
      
    </div>
  );
}

export default Target;
