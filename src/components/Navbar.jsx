import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // adjust path if different

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Left Side - Brand */}
        <div className="text-2xl font-bold text-black">
          QuizConnect
        </div>

        {/* Middle Links */}
        <div className="space-x-6">
          <Link to="/" className="text-black hover:text-blue-600">Home</Link>
          <Link to="/create-quiz" className="text-black hover:text-blue-600">Create Quiz</Link>
          <Link to="/attempt-quiz" className="text-black hover:text-blue-600">Attempt Quiz</Link>
          <Link to="/dashboard" className="text-black hover:text-blue-600">Dashboard</Link>
          <Link to="/result" className="text-black hover:text-blue-600">Result</Link>
        </div>

        {/* Right Side - Auth */}
        <div className="space-x-4">
          {!currentUser ? (
            <>
              <Link to="/login" className="px-4 py-2 border rounded-lg text-black hover:bg-gray-100">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 border rounded-lg text-black hover:bg-gray-100">
                Signup
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-black font-medium">
                {currentUser.displayName || currentUser.email}
              </span>
              <button 
                onClick={logout} 
                className="px-4 py-2 border rounded-lg text-black hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
