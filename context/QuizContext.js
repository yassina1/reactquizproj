import React, { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const value = {
    score,
    setScore,
    currentQuestion,
    setCurrentQuestion,
    questions,
    setQuestions,
    gameOver,
    setGameOver,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => useContext(QuizContext);
