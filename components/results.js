import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Results = ({ score, totalQuestions, onSave }) => {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();
  
  const handleSave = () => {
    if (playerName.trim()) {
      onSave({
        name: playerName,
        points: score,
        date: new Date().toISOString(),
      });
      navigate('/leaderboard');
    }
  };

  return (
    <ResultsContainer>
      <h2>Quiz Complete!</h2>
      <ScoreDisplay>
        You scored {score} out of {totalQuestions}!
        ({Math.round((score / totalQuestions) * 100)}%)
      </ScoreDisplay>
      
      <InputGroup>
        <Label>Enter your name:</Label>
        <Input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Your name"
        />
      </InputGroup>
      
      <ButtonGroup>
        <Button onClick={handleSave} disabled={!playerName.trim()}>
          Save Score
        </Button>
        <Button secondary onClick={() => navigate('/')}>
          Play Again
        </Button>
      </ButtonGroup>
    </ResultsContainer>
  );
};

const ResultsContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
`;

const ScoreDisplay = styled.div`
  font-size: 1.5rem;
  margin: 2rem 0;
  color: #2c3e50;
`;

const InputGroup = styled.div`
  margin: 1rem 0;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background: ${props => props.secondary ? '#95a5a6' : '#3498db'};
  color: white;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Results;
