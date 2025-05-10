import React from 'react';
import { useQuiz } from '../context/QuizContext';

const QuizQuestion: React.FC = () => {
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    setUserAnswers,
    setCurrentQuestionIndex,
    setIsQuizFinished,
    calculateScore,
  } = useQuiz();

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!userAnswers[currentQuestionIndex]) {
      window.alert('답안을 선택해주세요!');
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    if (!userAnswers[currentQuestionIndex]) {
      window.alert('답안을 선택해주세요!');
      return;
    }
    setIsQuizFinished(true);
    calculateScore();
  };

  return (
    <div className="question-container">
      <div className="question-number">
        문제 {currentQuestionIndex + 1} / {questions.length}
      </div>
      <div className="question-text">{currentQuestion.question}</div>
      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${
              userAnswers[currentQuestionIndex] === option ? 'selected' : ''
            }`}
            onClick={() => handleAnswerSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="navigation-buttons">
        {currentQuestionIndex === questions.length - 1 ? (
          <button onClick={handleSubmit}>제출하기</button>
        ) : (
          <button onClick={handleNext}>다음</button>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion; 