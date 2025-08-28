import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import AttemptQuiz from "./pages/AttemptQuiz";
import Results from "./pages/Results";
import PlayQuiz from "./pages/PlayQuiz";
// import {QuizContext} from "./context/QuizContext"; 
import { AuthProvider, useAuth } from "./context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center bg-white shadow px-6 py-3">
      {/* Left: Logo */}
      <Link to="/" className="font-bold text-xl text-black">
        QuizConnect
      </Link>

      {/* Middle: Nav links */}
      <div className="flex gap-6 text-black font-medium">
        <Link to="/">Home</Link>
        <Link to="/create-quiz">Create Quiz</Link>
        <Link to="/attempt-quiz">Attempt Quiz</Link>
        {/* <Link to="/dashboard">Dashboard</Link> */}
        <Link to="/results">Result</Link>
      </div>

      {/* Right: Auth buttons */}
      <div className="flex gap-4 items-center">
        {!user ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-700">Hi, {user.displayName || "User"}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <QuizProvider>
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route path="/attempt-quiz" element={<AttemptQuiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/play-quiz/:quizName" element={<PlayQuiz />} />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
    </QuizProvider>
  );
}
