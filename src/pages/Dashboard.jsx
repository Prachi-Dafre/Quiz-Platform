import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!user) {
    return <p className="text-center mt-10">Please login to access the dashboard.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.email} 🎉</h1>
      <div className="space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Quiz</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Attempt Quiz</button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded">View Scores</button>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}
