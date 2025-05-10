import React, { useState } from 'react';
import { QuizProvider } from './context/QuizContext';
import { UserProvider } from './context/UserContext';
import Quiz from './components/Quiz';
import StartScreen from './components/StartScreen';
import './App.css';

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <UserProvider>
      <QuizProvider>
        <div className="app">
          {!isStarted ? (
            <StartScreen onStart={() => setIsStarted(true)} />
          ) : (
            <Quiz isStarted={isStarted} setIsStarted={setIsStarted} />
          )}
        </div>
      </QuizProvider>
    </UserProvider>
  );
};

export default App;
