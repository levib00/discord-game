import { useEffect, useState } from 'react';

interface ICountdownProps {
  setIsTimerDone: React.Dispatch<React.SetStateAction<boolean>>
  startNumber: number
  timerShouldStart: boolean
}

const Countdown = (props: ICountdownProps) => {
  const { setIsTimerDone, startNumber, timerShouldStart } = props;
  const [countdownSeconds, setCountdownSeconds] = useState(startNumber);

  useEffect(() => {
    if (timerShouldStart) {
      let counter = startNumber;
      const countdown = setInterval(() => {
        counter -= 1;
        setCountdownSeconds(counter);
        if (!counter) {
          clearInterval(countdown);
          setIsTimerDone(true);
        }
      }, 1000);
    }
  }, [timerShouldStart]);

  return (
    <div data-testid='countdown'>
      <div>
        {countdownSeconds}
      </div>
    </div>
  );
};

export default Countdown;
