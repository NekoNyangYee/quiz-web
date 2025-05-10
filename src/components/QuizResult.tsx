import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { useUser } from '../context/UserContext';

interface QuizResultProps {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizResult: React.FC<QuizResultProps> = ({ setIsStarted }) => {
  const { score, questions, userAnswers, setCurrentQuestionIndex, setUserAnswers, setIsQuizFinished, setTimeLeft } = useQuiz();
  const { userInfo } = useUser();

  // userAnswers의 길이가 부족하면 빈 문자열로 채움
  const answers = [...userAnswers];
  while (answers.length < questions.length) {
    answers.push('');
  }

  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "축하합니다! 훌륭한 성적입니다!";
    if (percentage >= 70) return "잘했어요! 좋은 성적입니다.";
    if (percentage >= 50) return "무척 잘했습니다.";
    return "다음에는 더 잘할 수 있을 거예요!";
  };

  const handleRetry = () => {
    const confirmRetry = window.confirm('지금 입력한 개인정보로 다시 시작하시겠습니까?');
    if (confirmRetry) {
      setCurrentQuestionIndex(0);
      setUserAnswers(Array(questions.length).fill(''));
      setIsQuizFinished(false);
      setTimeLeft(1200); // 20분
    } else {
      setIsStarted(false);
    }
  };

  return (
    <div className="result-container">
      <h2>퀴즈 결과</h2>
      {userInfo && (
        <div className="user-info">
          <h3>응시자 정보</h3>
          <p>이름: {userInfo.name}</p>
          <p>나이: {userInfo.age}세</p>
          <p>이메일: {userInfo.email}</p>
        </div>
      )}
      <div className="score-summary">
        <h3>{getResultMessage()}</h3>
        <p>총 문제 수: {questions.length}</p>
        <p>맞힌 문제 수: {score}</p>
        <p>정답률: {((score / questions.length) * 100).toFixed(1)}%</p>
        <button className="start-button" onClick={handleRetry}>다시하기</button>
      </div>
      <div className="answer-review">
        <h3>문제별 정답 확인</h3>
        {questions.map((question, index) => (
          <div key={index} className="answer-item">
            <p>문제 {index + 1}: {question.question}</p>
            <p>난이도: {question.difficulty}</p>
            <p>정답: {question.answer}</p>
            <p>내 답변: {answers[index] || '미답변'}</p>
            <p className={answers[index] === question.answer ? 'correct' : 'incorrect'}>
              {answers[index] === question.answer ? '정답' : '오답'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizResult; 