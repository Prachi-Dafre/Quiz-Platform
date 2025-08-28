import { useState } from "react";
import { useQuiz } from "../context/QuizContext";

export default function CreateQuiz() {
  const { addQuiz } = useQuiz();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSave = () => {
    if (!question || options.some((o) => !o)) {
      alert("Please fill all fields");
      return;
    }

    addQuiz("defaultUser", {
      question,
      correctAnswer: options[correctIndex],
      wrongAnswers: options.filter((_, idx) => idx !== correctIndex),
    });

    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(0);
    alert("Question saved!");
  };

  return (
    <div className="flex items-center justify-center bg-white p-5">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border border-purple-300">
        <h2 className="text-2xl font-bold mb-5 text-center text-purple-700">
          Create Quiz
        </h2>

        <div className="mb-5">
          <label className="block font-semibold mb-2 text-gray-700">Question</label>
          <textarea
            className="w-full p-3 rounded-lg border border-purple-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="block font-semibold mb-2 text-gray-700">
            Select the correct answer
          </label>
          {options.map((opt, idx) => (
            <div
              key={idx}
              className="flex items-center mb-3 rounded-lg border border-purple-300"
            >
              <span
                onClick={() => setCorrectIndex(idx)}
                className={`flex items-center justify-center w-10 h-10 cursor-pointer font-bold transition-colors ${
                  idx === correctIndex
                    ? "bg-green-600 text-white" // Correct tick
                    : "bg-red-600 text-white hover:bg-red-500" // Wrong cross
                }`}
              >
                {idx === correctIndex ? "✓" : "✕"}
              </span>
              <input
                type="text"
                placeholder={`Option ${idx + 1}`}
                className="flex-1 p-3 outline-none border-l border-purple-300 text-gray-800 placeholder-gray-400"
                value={opt}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[idx] = e.target.value;
                  setOptions(newOptions);
                }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition-all"
        >
          Save Question
        </button>
      </div>
    </div>
  );
}
