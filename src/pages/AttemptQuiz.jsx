import { Link } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

export default function AttemptQuiz() {
  const { quizzes } = useQuiz();

  // Default quiz categories with placeholder counts
  const defaultQuizzes = [
    { username: "Maths", questions: 10 },
    { username: "General Knowledge", questions: 10 },
    { username: "History", questions: 10 },
    { username: "Sports", questions: 10 },
    { username: "Technology", questions: 10 },
  ];

  // Merge defaults + dynamic quizzes (dynamic replaces default if same name)
  const allQuizzes = [
    ...defaultQuizzes.filter(
      dq => !Object.keys(quizzes).includes(dq.username)
    ),
    ...Object.keys(quizzes).map(username => ({
      username,
      questions: quizzes[username].length
    })),
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {allQuizzes.map((quiz, index) => (
        <div
          key={index}
          className="w-64 h-72 bg-gradient-to-b from-purple-500 to-indigo-600 
          rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 
          transition-transform duration-300"
        >
          {/* Card Header */}
          <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-500 
          text-white text-center font-bold text-lg">
            {quiz.username} Quiz
          </div>

          {/* Progress Bar (static or dynamic) */}
          <div className="h-2 bg-purple-200">
            <div
              className="h-2 bg-yellow-400 rounded-r"
              style={{ width: "100%" }}
            ></div>
          </div>

          {/* Card Content */}
          <div className="p-5 bg-white text-center flex flex-col justify-between 
          h-[calc(100%-72px)]">
            <p className="text-gray-700 mb-4 text-base">
              {quiz.questions} Question(s)
            </p>

           <Link
  to={`/play-quiz/${quiz.username}`} // <-- match the PlayQuiz route
  className="inline-flex items-center justify-center gap-2 w-full 
  py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold 
  rounded-xl shadow-lg transition-all"
>
  <PlayCircleIcon className="h-5 w-5 text-white" />
  Play Now
</Link>

          </div>
        </div>
      ))}
    </div>
  );
}
