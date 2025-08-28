import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen text-center">
      {/* Hero Section */}
      <section className="pt-28 px-6">
        <h1 className="text-5xl font-bold text-black mb-6">
          The world’s best Quiz Platform
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Create, play, and share quizzes in minutes. Make learning interactive,
          fun, and unforgettable. The ultimate free quiz platform for friends,
          students, marketers, and more.
        </p>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => navigate("/create-quiz")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Create Quiz
          </button>
          <button
            onClick={() => navigate("/attempt-quiz")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            Attempt Quiz
          </button>
        </div>
      </section>

      {/* New Two-Column Section */}
      <section className="mt-20 px-8 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center text-left">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl font-bold text-black mb-4">
            The ultimate no-code quiz maker
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Play while you learn with an engaging quiz. Spelling bees,
            personality tests, trivia nights, icebreakers, brain teasers,
            eLearning tools… you name it, you can do it with Canva's intuitive
            and interactive quiz maker. Design single-question, text-based
            quizzes—think multiple choice, true or false, or fill-in-the-blanks.
            You can even embed your quizzes into presentations and lesson plans
            to make learning more fun and engaging!
          </p>
          <button
            onClick={() => navigate("/attempt-quiz")}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-700 transition"
          >
            Attempt Quiz
          </button>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <img
            src="/quiz.png"
            alt="Quiz preview"
            className="w-[99%] max-w-lg rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Centered Large Video Section */}
      <section className="mt-20 flex justify-center">
        <video
          className="w-[85%] h-[70vh] object-cover rounded-lg shadow-lg"
          title="Free online quiz maker on Canva"
          loop
          playsInline
          autoPlay
          muted
          preload="none"
          src="https://content-management-files.canva.com/98584fc6-2bc9-4847-935f-e98774169655/quizzes_hero.mp4"
        ></video>
      </section>

      {/* Screenshot Section */}
      <div className="w-full bg-gray-900 text-white mt-20 py-12 px-8">
        <h2 className="text-xl font-bold text-yellow-400 mb-8">BY THE NUMBERS</h2>
        <div className="flex flex-wrap justify-between items-center gap-8 max-w-5xl mx-auto">
          {/* Avg Rating */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">AVG RATING</span>
            <div className="flex items-center mt-2">
              <span className="flex text-yellow-400 text-xl">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </span>
              <span className="ml-2">4.5 out of 5</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              1524 customers from the last 30 days
            </p>
          </div>

          {/* Questions answered */}
          <div>
            <h3 className="text-2xl font-bold">500 M</h3>
            <p className="text-gray-400 text-sm">questions answered</p>
          </div>

          {/* Degrees */}
          <div>
            <h3 className="text-2xl font-bold">1500+</h3>
            <p className="text-gray-400 text-sm">degrees and careers</p>
          </div>

          {/* Traits */}
          <div>
            <h3 className="text-2xl font-bold">140+</h3>
            <p className="text-gray-400 text-sm">personality traits</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
