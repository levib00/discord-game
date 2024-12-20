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
    <div data-testid='countdown' className={startNumber < 10 ? 'countdown starting-countdown' : 'countdown'}>
      <div className='countdown-number'>{countdownSeconds}</div>
      <div className='countdown-background'></div>
    </div>
  );
};

export default Countdown;
