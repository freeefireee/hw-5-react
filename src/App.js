import React, { useState, useEffect } from 'react';
import './style.css';

const ClickerApp = () => {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [targetTime, setTargetTime] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleReset = () => {
    setTimerActive(false);
    setCount(0);
    setSeconds(0);
    setMilliseconds(0);
  };

  const handleStart = () => {
    setTimerActive(true);
  };

  const handleSetTargetTime = (event) => {
    const inputTime = parseInt(event.target.value, 10);
    if (!isNaN(inputTime) && inputTime >= 0) {
      setTargetTime(inputTime);
    }
  };

  useEffect(() => {
    let interval;

    if (timerActive) {
      interval = setInterval(() => {
        setMilliseconds((prevMilliseconds) => {
          if (prevMilliseconds === 900) {
            setSeconds((prevSeconds) => {
              if (prevSeconds === targetTime) {
                setTimerActive(false);
                return 0;
              } else {
                return prevSeconds + 1;
              }
            });
            return 0;
          } else {
            return prevMilliseconds + 100;
          }
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [timerActive, targetTime]);

  return (
    <div className='content-block'>
      <h1>Clicker App</h1>
<label>
        Set Target Time (seconds):
        <input type="number" value={targetTime} onChange={handleSetTargetTime} />
      </label>
      <p>Click count: {count}</p>
      <p>Time: {seconds} seconds {milliseconds} milliseconds</p>
      
      <div className='button1'>
      <button className="button-85" role="button" onClick={handleStart}>Start</button>
      <button className="button-89" role="button" onClick={handleClick}>Click me</button>
      <button className="button-86" role="button" onClick={handleReset}>Reset</button>
      
      </div>

      
    </div>
  );
};

export default ClickerApp;




