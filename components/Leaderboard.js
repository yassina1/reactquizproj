import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Leaderboard = ({ scores }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };

  return (
    <Container>
      <Title>🏆 Leaderboard</Title>
      {(!scores || scores.length === 0) ? (
        <EmptyState>No scores yet! Be the first to play!</EmptyState>
      ) : (
        <ScoresList>
          {scores.map((score, index) => (
            <ScoreItem key={index}>
              <Rank>{index + 1}</Rank>
              <PlayerInfo>
                <PlayerName>{score.name || 'Anonymous'}</PlayerName>
                <ScorePoints>{score.points || 0} points</ScorePoints>
              </PlayerInfo>
              <DateDisplay>{formatDate(score.date)}</DateDisplay>
            </ScoreItem>
          ))}
        </ScoresList>
      )}
      <Button onClick={() => navigate('/')}>Play Again</Button>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 20px;
  color: #7f8c8d;
  font-style: italic;
`;

const ScoresList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const ScoreItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Rank = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  width: 40px;
`;

const PlayerInfo = styled.div`
  flex: 1;
  margin: 0 15px;
`;

const PlayerName = styled.div`
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.1rem;
`;

const ScorePoints = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const DateDisplay = styled.div`
  color: #95a5a6;
  font-size: 0.9rem;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

export default Leaderboard;
