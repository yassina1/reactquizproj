import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../api/triviaApi';

const CategorySelect = ({ onStartQuiz }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  const handleStart = () => {
    if (!selectedCategory) return;
    onStartQuiz(selectedCategory, difficulty);
    navigate('/quiz');
  };

  return (
    <Container>
      <GradientCard>
        <WelcomeTitle>Welcome to Quiz Master! 🎯</WelcomeTitle>
        <Description>
          Test your knowledge across various categories and challenge yourself to become a Quiz Master!
        </Description>
        
        <SelectGroup>
          <Label>Select Category:</Label>
          <StyledSelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Choose a category...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </StyledSelect>
        </SelectGroup>

        <SelectGroup>
          <Label>Select Difficulty:</Label>
          <StyledSelect
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </StyledSelect>
        </SelectGroup>

        <StartButton 
          onClick={handleStart} 
          disabled={!selectedCategory}
          $isActive={!!selectedCategory}
        >
          Start Quiz
        </StartButton>
      </GradientCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 20px;
`;

const GradientCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const WelcomeTitle = styled.h2`
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 700;
  background: linear-gradient(135deg, #3498db, #2980b9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const SelectGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.1rem;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background-color: white;
  font-size: 1rem;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #3498db;
  }

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const StartButton = styled.button`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: ${props => props.$isActive ? 'pointer' : 'not-allowed'};
  background: ${props => props.$isActive ? 
    'linear-gradient(135deg, #3498db, #2980b9)' : 
    'linear-gradient(135deg, #bdc3c7, #95a5a6)'};
  color: white;
  transition: all 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    transform: ${props => props.$isActive ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.$isActive ? '0 5px 15px rgba(52, 152, 219, 0.3)' : 'none'};
  }

  &:active {
    transform: ${props => props.$isActive ? 'translateY(0)' : 'none'};
  }
`;

export default CategorySelect;