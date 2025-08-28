import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
import { ArrowLeftIcon, BookmarkIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export default function PlayQuiz() {
  const { quizName } = useParams();
  const { quizzes, addResult } = useQuiz(); // addResult saves results
  const navigate = useNavigate();
  // Default questions for each category
  const defaultQuestions = {
    Maths: [
      { question: "What is 12 × 8?", options: ["96", "84", "108", "112"], correctAnswer: "96" },
      { question: "Square root of 144?", options: ["10", "11", "12", "13"], correctAnswer: "12" },
      { question: "Square root of 144?", options: ["10","11","12","13"], correctAnswer: "12" },
    { question: "What is 7²?", options: ["42","49","56","64"], correctAnswer: "49" },
    { question: "Solve: 50 − 17", options: ["33","37","30","32"], correctAnswer: "33" },
    { question: "What is 100 ÷ 4?", options: ["20","25","40","50"], correctAnswer: "25" },
    { question: "Solve: 9 × 9", options: ["81","72","99","90"], correctAnswer: "81" },
    { question: "What is 8 + 15?", options: ["21","22","23","24"], correctAnswer: "23" },
    { question: "What is 45 + 55?", options: ["90","95","100","105"], correctAnswer: "100" },
    { question: "Solve: 200 − 75", options: ["115","120","125","130"], correctAnswer: "125" }
    ],
    Chemistry: [
     { question: "Symbol for Sodium?", options: ["S","Na","So","Sn"], correctAnswer: "Na" }, 
     { question: "H₂O is the chemical name for?", options: ["Oxygen","Water","Hydrogen","Acid"], correctAnswer: "Water" }, 
     { question: "Atomic number of Carbon?", options: ["6","7","8","12"], correctAnswer: "6" }, 
     { question: "Which gas is used in balloons?", options: ["Oxygen","Nitrogen","Helium","Hydrogen"], correctAnswer: "Helium" }, 
     { question: "Acid in lemon?", options: ["Citric Acid","Sulfuric Acid","Acetic Acid","Lactic Acid"], correctAnswer: "Citric Acid" }, 
     { question: "pH value of pure water?", options: ["5","6","7","8"], correctAnswer: "7" }, 
     { question: "Chemical formula for table salt?", options: ["NaCl","KCl","NaOH","HCl"], correctAnswer: "NaCl" }, 
     { question: "Gas released by plants during photosynthesis?", options: ["CO₂","O₂","N₂","H₂"], correctAnswer: "O₂" }, 
     { question: "Hardest natural substance?", options: ["Gold","Iron","Diamond","Quartz"], correctAnswer: "Diamond" }, 
     { question: "Symbol for Potassium?", options: ["P","Po","Pt","K"], correctAnswer: "K" }
    ],
   
    History: [
     { question: "Year WWII ended?", options: ["1940","1942","1945","1950"], correctAnswer: "1945" }, 
     { question: "Who discovered America?", options: ["Columbus","Newton","Einstein","Magellan"], correctAnswer: "Columbus" }, 
     { question: "First President of USA?", options: ["Washington","Lincoln","Jefferson","Adams"], correctAnswer: "Washington" }, 
     { question: "Taj Mahal built by?", options: ["Akbar","Shah Jahan","Aurangzeb","Humayun"], correctAnswer: "Shah Jahan" }, 
     { question: "Roman Empire fell in which year?", options: ["476 AD","410 AD","800 AD","1000 AD"], correctAnswer: "476 AD" }, 
     { question: "Who was known as Iron Man of India?", options: ["Patel","Nehru","Bose","Gandhi"], correctAnswer: "Patel" }, 
     { question: "Battle of Plassey year?", options: ["1757","1764","1857","1947"], correctAnswer: "1757" }, 
     { question: "Founder of Mughal Empire?", options: ["Akbar","Babur","Shah Jahan","Aurangzeb"], correctAnswer: "Babur" }, 
     { question: "Who discovered penicillin?", options: ["Fleming","Darwin","Curie","Pasteur"], correctAnswer: "Fleming" },
    { question: "Cold War was between?", options: ["USA & USSR","USA & China","UK & USSR","Germany & USSR"], correctAnswer: "USA & USSR" }
    ],
    Sports: [
     { question: "First FIFA World Cup winner?", options: ["Uruguay","Brazil","Italy","Germany"], correctAnswer: "Uruguay" }, 
     { question: "NBA stands for?", options: ["National Basketball Association","National Baseball Association","New Boxing Alliance","None"], correctAnswer: "National Basketball Association" },
      { question: "How many players in a football team?", options: ["9","10","11","12"], correctAnswer: "11" }, 
      { question: "Cricket World Cup 2011 winner?", options: ["India","Australia","Pakistan","Sri Lanka"], correctAnswer: "India" }, 
      { question: "Tennis Grand Slam surfaces?", options: ["4","3","2","5"], correctAnswer: "4" }, 
      { question: "Olympics held every _ years?", options: ["2","3","4","5"], correctAnswer: "4" }, 
      { question: "Hockey is national game of?", options: ["India","Pakistan","Both","None"], correctAnswer: "Both" }, 
      { question: "Ronaldo's nationality?", options: ["Spanish","Portuguese","Brazilian","Italian"], correctAnswer: "Portuguese" }, 
      { question: "Sachin Tendulkar sport?", options: ["Hockey","Football","Tennis","Cricket"], correctAnswer: "Cricket" }, 
     { question: "Maradona played for?", options: ["Argentina","Brazil","Portugal","Spain"], correctAnswer: "Argentina" }
    ],
    Technology: [
  { question: "Who founded Microsoft?", options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Elon Musk"], correctAnswer: "Bill Gates" },
  { question: "Father of Computer?", options: ["Turing","Babbage","Jobs","Gates"], correctAnswer: "Babbage" },
  { question: "HTML stands for?", options: ["Hyper Trainer Marking Language","Hyper Text Markup Language","Hyper Tool Multi Language","None"], correctAnswer: "Hyper Text Markup Language" },
  { question: "Shortcut for copy?", options: ["Ctrl+A","Ctrl+C","Ctrl+V","Ctrl+X"], correctAnswer: "Ctrl+C" },
  { question: "Python is a _?", options: ["Snake","Language","Car","OS"], correctAnswer: "Language" },
  { question: "iOS made by?", options: ["Apple","Google","Microsoft","Samsung"], correctAnswer: "Apple" },
  { question: "JavaScript used for?", options: ["Styling","Structure","Logic","None"], correctAnswer: "Logic" },
  { question: "AI stands for?", options: ["Artificial Intelligence","Actual Intelligence","Automated Input","None"], correctAnswer: "Artificial Intelligence" },
  { question: "5G refers to?", options: ["5th Generation","5 Gigabytes","5 Goals","None"], correctAnswer: "5th Generation" } 
    ],
  };

  const quizData = quizzes[quizName]?.length > 0 ? quizzes[quizName] : defaultQuestions[quizName] || [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState(15); 
  const [visibleOptions, setVisibleOptions] = useState([]);

  useEffect(() => {
    if (quizData.length > 0) {
      setVisibleOptions(quizData[currentQuestionIndex].options);
      setSelected(null);
      setTime(15);
    }
  }, [currentQuestionIndex, quizData]);

  useEffect(() => {
    if (selected !== null) return; // pause timer if answered
    const interval = setInterval(() => {
      setTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [selected]);

  if (quizData.length === 0) return <p>No questions found for {quizName}.</p>;

  const { question, options, correctAnswer } = quizData[currentQuestionIndex];

  const handleSelect = (option) => setSelected(option);

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      alert("Quiz finished!");
    }
  };

  const handleSkip = () => handleNext();

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <ArrowLeftIcon className="h-6 w-6 text-gray-700 cursor-pointer" />
        <h2 className="font-semibold text-gray-700">Question {currentQuestionIndex + 1}/{quizData.length}</h2>
        <BookmarkIcon className="h-6 w-6 text-gray-700 cursor-pointer" />
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white p-6 rounded-xl mb-4 shadow-lg">
        <p className="text-lg">{question}</p>
      </div>

      {/* Timer / progress bar */}
      <div className="h-2 w-full bg-gray-300 rounded-full mb-6">
        <div
          className="h-2 bg-yellow-400 rounded-full transition-all"
          style={{ width: `${((15 - time) / 15) * 100}%` }}
        ></div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {visibleOptions.map((opt, idx) => {
          const isCorrect = opt === correctAnswer;
          const isSelected = opt === selected;
          return (
            <button
              key={idx}
              onClick={() => handleSelect(opt)}
              disabled={selected !== null}
              className={`w-full flex items-center p-4 rounded-xl border transition-colors duration-200
                ${selected
                  ? isCorrect
                    ? "bg-green-100 border-green-400"
                    : isSelected
                    ? "bg-red-100 border-red-400"
                    : "bg-white border-gray-300"
                  : "bg-white border-gray-300 hover:bg-gray-100"
                }`}
            >
              <span className="mr-4 font-bold">{optionLabels[idx]}</span>
              <span className="flex-1 text-left">{opt}</span>
              {isCorrect && selected && <CheckCircleIcon className="h-5 w-5 text-green-500" />}
            </button>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between mt-6 space-x-2">
        <button
          onClick={handleSkip}
          className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold"
        >
          Skip
        </button>
      </div>

      {/* Next Button */}
      {selected !== null && (
        <div className="mt-4 text-center">
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold"
          >
            {currentQuestionIndex < quizData.length - 1 ? "Next" : "Finish Quiz"}
          </button>
        </div>
      )}
    </div>
  );
}