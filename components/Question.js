import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuiz } from '../context/QuizContext';

const Question = ({ questionData, onNext }) => {
  const { setScore, score } = useQuiz();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === questionData.correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    onNext();
  };

  return (
    <Container>
      <h2 dangerouslySetInnerHTML={{ __html: questionData.question }} />
      <Options>
        {questionData.incorrect_answers.concat(questionData.correct_answer).sort().map((answer, index) => (
          <Option
            key={index}
            onClick={() => handleAnswer(answer)}
            $selected={selectedAnswer === answer}
            $correct={isAnswered && answer === questionData.correct_answer}
            $incorrect={isAnswered && selectedAnswer === answer && answer !== questionData.correct_answer}
            disabled={isAnswered}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </Option>
        ))}
      </Options>
      {isAnswered && <NextButton onClick={handleNext}>Next</NextButton>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Option = styled.button`
  padding: 10px;
  background-color: ${({ $selected, $correct, $incorrect }) =>
    $correct ? '#4CAF50' : $incorrect ? '#f44336' : $selected ? '#ddd' : '#fff'};
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const NextButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default Question;
