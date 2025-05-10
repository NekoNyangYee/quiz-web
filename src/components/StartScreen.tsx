import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const { setUserInfo } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserInfo({
      name: formData.name,
      age: parseInt(formData.age),
      email: formData.email
    });
    onStart();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="start-screen">
      <h1>퀴즈 시작하기</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">나이:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
            max="120"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="start-button">퀴즈 시작하기</button>
      </form>
    </div>
  );
};

export default StartScreen; 