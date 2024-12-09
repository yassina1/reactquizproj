import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { QuizProvider } from './context/QuizContext';
import CategorySelect from './components/CategorySelect';
import Quiz from './components/Quiz';
import Leaderboard from './components/Leaderboard';
import { GlobalStyle } from './styles/GlobalStyles';

function App() {
  const [quizSettings, setQuizSettings] = useState(null);
  const [scores, setScores] = useState(() => {
    const savedScores = localStorage.getItem('quizScores');
    return savedScores ? JSON.parse(savedScores) : [];
  });

  const handleStartQuiz = (category, difficulty) => {
    setQuizSettings({ category, difficulty });
  };

  const saveScore = (score) => {
    const newScores = [...scores, score].sort((a, b) => b.points - a.points);
    setScores(newScores);
    localStorage.setItem('quizScores', JSON.stringify(newScores));
  };

  return (
    <>
      <GlobalStyle />
      <QuizProvider>
        <Router>
          <AppContainer>
            <Header>
              <Title>Quiz Master</Title>
            </Header>
            <Routes>
              <Route 
                path="/" 
                element={<CategorySelect onStartQuiz={handleStartQuiz} />} 
              />
              <Route 
                path="/quiz" 
                element={
                  <Quiz 
                    settings={quizSettings} 
                    onComplete={saveScore}
                  />
                } 
              />
              <Route 
                path="/leaderboard" 
                element={<Leaderboard scores={scores} />} 
              />
            </Routes>
          </AppContainer>
        </Router>
      </QuizProvider>
    </>
  );
}

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  margin: 1rem 0;
`;

export default App;