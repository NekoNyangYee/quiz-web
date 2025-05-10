import React, { createContext, useContext, useState } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';
import quizData from '../data/quizData.json';

interface Question {
  id: number;
  difficulty: string;
  question: string;
  options: string[];
  answer: string;
}

interface QuizContextType {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: string[];
  timeLeft: number;
  isQuizFinished: boolean;
  score: number;
  setCurrentQuestionIndex: (index: number) => void;
  setUserAnswers: (answers: string[]) => void;
  setTimeLeft: Dispatch<SetStateAction<number>>;
  setIsQuizFinished: (finished: boolean) => void;
  setScore: (score: number) => void;
  calculateScore: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(quizData.questions.length).fill(''));
  const [timeLeft, setTimeLeft] = useState(1200); // 20분 = 1200초
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const calculateScore = () => {
    let correctAnswers = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === quizData.questions[index].answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
  };

  return (
    <QuizContext.Provider
      value={{
        questions: quizData.questions,
        currentQuestionIndex,
        userAnswers,
        timeLeft,
        isQuizFinished,
        score,
        setCurrentQuestionIndex,
        setUserAnswers,
        setTimeLeft,
        setIsQuizFinished,
        setScore,
        calculateScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}; 