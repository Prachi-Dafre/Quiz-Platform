import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
import { ArrowLeftIcon, BookmarkIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export default function PlayQuiz() {
  const { quizName } = useParams();
  const { quizzes, addResult } = useQuiz();
  const navigate = useNavigate();

  const defaultQuestions = {
    Maths: [
      { question: "What is 12 × 8?", options: ["96", "84", "108", "112"], correctAnswer: "96" },
      { question: "Square root of 144?", options: ["10", "11", "12", "13"], correctAnswer: "12" },
      { question: "What is 7²?", options: ["42", "49", "56", "64"], correctAnswer: "49" }
    ],
    "General Knowledge": [
      { question: "Capital of India?", options: ["Delhi", "Mumbai", "Chennai", "Kolkata"], correctAnswer: "Delhi" },
      { question: "Which planet is known as Red Planet?", options: ["Mars", "Venus", "Jupiter", "Saturn"], correctAnswer: "Mars" },
      { question: "Largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correctAnswer: "Pacific" }
    ]
  };

  const formattedQuizName = quizName
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());

  const quizData = quizzes[formattedQuizName]?.length > 0
    ? quizzes[formattedQuizName]
    : defaultQuestions[formattedQuizName] || [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState(15);

  const currentQuestion = quizData[currentQuestionIndex];

  useEffect(() => {
    setSelected(null);
    setTime(15);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (selected) return; // pause timer when answered
    const interval = setInterval(() => {
      setTime(prev => {
        if (prev <= 0) {
          handleNext();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [selected]);

  if (!currentQuestion) return <p className="text-center mt-10">No questions found for {formattedQuizName}.</p>;

  const handleSelect = (option) => {
    if (selected) return; // prevent multiple clicks
    setSelected(option);
    addResult(formattedQuizName, {
      question: currentQuestion.question,
      selected: option,
      correct: currentQuestion.correctAnswer
    });
  };

  const handleNext = () => {
    setSelected(null);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      alert("Quiz finished!");
      navigate("/");
    }
  };

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <ArrowLeftIcon className="h-6 w-6 text-gray-700 cursor-pointer" onClick={() => navigate(-1)} />
        <h2 className="font-semibold text-gray-700">
          Question {currentQuestionIndex + 1}/{quizData.length}
        </h2>
        <BookmarkIcon className="h-6 w-6 text-gray-700 cursor-pointer" />
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-xl mb-4 shadow-lg">
        <p className="text-lg">{currentQuestion.question}</p>
      </div>

      {/* Timer */}
      <div className="flex justify-between mb-4 items-center">
        <span className="text-gray-700 font-semibold">Time left: {time}s</span>
        <div className="h-2 flex-1 bg-gray-300 rounded-full mx-2">
          <div
            className="h-2 bg-yellow-400 rounded-full transition-all"
            style={{ width: `${(time / 15) * 100}%` }}
          />
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {currentQuestion.options.map((opt, idx) => {
          const isCorrect = opt === currentQuestion.correctAnswer;
          const isSelected = opt === selected;

          let bgClass = "bg-white border-gray-300 hover:bg-gray-100";
          if (selected) {
            if (isSelected && isCorrect) bgClass = "bg-green-300 border-green-500";
            else if (isSelected && !isCorrect) bgClass = "bg-red-300 border-red-500";
            else if (!isSelected && isCorrect) bgClass = "bg-green-100 border-green-400";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(opt)}
              disabled={!!selected}
              className={`w-full flex items-center p-4 rounded-xl border font-medium transition-colors duration-200 ${bgClass}`}
            >
              <span className="mr-4 font-bold">{optionLabels[idx]}</span>
              <span className="flex-1 text-left">{opt}</span>
              {isSelected && isCorrect && <CheckCircleIcon className="h-5 w-5 text-green-600" />}
            </button>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between mt-6 space-x-2">
        <button
          onClick={handleNext}
          className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
        >
          {currentQuestionIndex < quizData.length - 1 ? "Next" : "Finish Quiz"}
        </button>
      </div>
    </div>
  );
}
