import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <TimerContainer>
      <TimerBar width={(timeLeft / duration) * 100} />
      <TimeText>{timeLeft}s</TimeText>
    </TimerContainer>
  );
};

const TimerContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
`;

const TimerBar = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background-color: #4CAF50;
  transition: width 1s linear;
`;

const TimeText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333;
`;

export default Timer;
