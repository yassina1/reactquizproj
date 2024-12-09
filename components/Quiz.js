import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { fetchQuizQuestions } from '../api/triviaApi';
import Question from './Question';
import Timer from './Timer';
import Results from './results';
import styled from 'styled-components';

const Quiz = ({ settings, onComplete }) => {
  const navigate = useNavigate();
  const { 
    questions, 
    setQuestions, 
    currentQuestion, 
    setCurrentQuestion, 
    gameOver, 
    setGameOver,
    score,
    setScore 
  } = useQuiz();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!settings) {
      navigate('/');
      return;
    }

    const loadQuestions = async () => {
      try {
        const data = await fetchQuizQuestions(10, settings.category, settings.difficulty);
        setQuestions(data);
        setCurrentQuestion(0);
        setScore(0);
        setGameOver(false);
      } catch (error) {
        console.error('Error loading questions:', error);
        if (error.response && error.response.status === 429) {
          setError(
            <ErrorContainer>
              <ErrorMessage>Too many requests. Please wait a moment before trying again.</ErrorMessage>
              <RetryButton onClick={() => navigate('/')}>
                Return to Category Selection
              </RetryButton>
            </ErrorContainer>
          );
        } else {
          setError(
            <ErrorContainer>
              <ErrorMessage>Failed to load questions. Please try again later.</ErrorMessage>
              <RetryButton onClick={() => navigate('/')}>
                Return to Category Selection
              </RetryButton>
            </ErrorContainer>
          );
        }
      }
    };

    loadQuestions();
  }, [settings, navigate, setQuestions, setCurrentQuestion, setScore, setGameOver]);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleTimeUp = () => {
    handleNextQuestion();
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!settings) {
    return null;
  }

  if (gameOver) {
    return <Results score={score} totalQuestions={questions.length} onSave={onComplete} />;
  }

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div>
      <Timer duration={30} onTimeUp={handleTimeUp} />
      <Question questionData={questions[currentQuestion]} onNext={handleNextQuestion} />
    </div>
  );
};

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

export default Quiz;
