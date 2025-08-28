import { createContext, useState, useContext } from "react";

const QuizContext = createContext();



export function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState({}); 
  // structure: { username: [ {question, correctAnswer, wrongAnswers[]}, ... ] }

  const addQuiz = (username, newQuestion) => {
    setQuizzes((prev) => ({
      ...prev,
      [username]: [...(prev[username] || []), newQuestion],
    }));
  };

  return (
    <QuizContext.Provider value={{ quizzes, addQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  return useContext(QuizContext);
}
