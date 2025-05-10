import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';

interface QuizProps {
  isStarted: boolean;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const Quiz: React.FC<QuizProps> = ({ isStarted, setIsStarted }) => {
  const {
    timeLeft,
    setTimeLeft,
    isQuizFinished,
    setIsQuizFinished,
    calculateScore,
  } = useQuiz();

  // 타이머 감소만 담당
  useEffect(() => {
    if (isQuizFinished) return;
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [setTimeLeft, timeLeft, isQuizFinished]);

  // timeLeft가 0이 되는 순간 경고창 및 결과 이동
  useEffect(() => {
    if (timeLeft === 0 && !isQuizFinished) {
      window.alert('제한시간이 종료되었습니다. 결과 페이지로 이동합니다.');
      calculateScore();
      setIsQuizFinished(true);
    }
  }, [timeLeft, isQuizFinished, setIsQuizFinished, calculateScore]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isQuizFinished) {
    return <QuizResult setIsStarted={setIsStarted} />;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>퀴즈</h2>
        <div className="timer">남은 시간: {formatTime(timeLeft)}</div>
      </div>
      <QuizQuestion />
    </div>
  );
};

export default Quiz; 