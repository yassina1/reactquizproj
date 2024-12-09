import axios from 'axios';

const BASE_URL = 'https://opentdb.com/api.php';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour cache
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Sample questions for fallback
const FALLBACK_QUESTIONS = [
  {
    question: "What is the capital of France?",
    correct_answer: "Paris",
    incorrect_answers: ["London", "Berlin", "Madrid"]
  },
  {
    question: "Which planet is known as the Red Planet?",
    correct_answer: "Mars",
    incorrect_answers: ["Venus", "Jupiter", "Mercury"]
  },
  {
    question: "What is the largest mammal in the world?",
    correct_answer: "Blue Whale",
    incorrect_answers: ["African Elephant", "Giraffe", "Hippopotamus"]
  },
  // Add more fallback questions as needed
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getFromCache = (key) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Cache error:', error);
    return null;
  }
};

const saveToCache = (key, data) => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.error('Cache save error:', error);
  }
};

export const fetchQuizQuestions = async (amount, category, difficulty, retryCount = 0) => {
  const cacheKey = `quiz_questions_${category}_${difficulty}`;
  
  // Try to get from cache first
  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    console.log('Using cached questions');
    return cachedData;
  }

  try {
    console.log(`Fetching questions (attempt ${retryCount + 1}/${MAX_RETRIES})`);
    const response = await axios.get(BASE_URL, {
      params: {
        amount,
        category,
        difficulty,
        type: 'multiple'
      }
    });

    if (response.data.results && response.data.results.length > 0) {
      saveToCache(cacheKey, response.data.results);
      return response.data.results;
    }
    
    throw new Error('No questions received from API');
  } catch (error) {
    console.error('API Error:', error);

    // If we haven't reached max retries and it's a 429 error, retry after delay
    if (retryCount < MAX_RETRIES && error.response?.status === 429) {
      console.log(`Retrying after ${RETRY_DELAY}ms...`);
      await delay(RETRY_DELAY * (retryCount + 1));
      return fetchQuizQuestions(amount, category, difficulty, retryCount + 1);
    }

    // If all retries failed or other error, use fallback questions
    console.log('Using fallback questions');
    return FALLBACK_QUESTIONS;
  }
};

export const fetchCategories = async () => {
  const cacheKey = 'quiz_categories';
  const cachedData = getFromCache(cacheKey);
  
  if (cachedData) {
    console.log('Using cached categories');
    return cachedData;
  }

  try {
    console.log('Fetching categories');
    const response = await axios.get('https://opentdb.com/api_category.php');
    if (response.data.trivia_categories) {
      saveToCache(cacheKey, response.data.trivia_categories);
      return response.data.trivia_categories;
    }
    throw new Error('No categories received');
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return some default categories if API fails
    return [
      { id: 9, name: "General Knowledge" },
      { id: 10, name: "Books" },
      { id: 11, name: "Film" },
      { id: 12, name: "Music" },
      // Add more default categories as needed
    ];
  }
};
