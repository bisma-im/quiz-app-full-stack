import React, { useState, useEffect } from 'react';
import SummaryScreen from './SummaryScreen'; // Import the new SummaryScreen component

const Quiz = () => {
  const [start, setStart] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Set timer for 60 seconds

  const questions = [
    { question: "Is 5 a prime number?", correctAnswer: "Yes", description: "Prime numbers are only divisible by 1 and themselves." },
    { question: "Is 6 an even number?", correctAnswer: "Yes", description: "Even numbers are divisible by 2." },
    { question: "Is the square root of 4 equal to 3?", correctAnswer: "No", description: "The square root of 4 is 2." },
    { question: "Is the capital of France Berlin?", correctAnswer: "No", description: "The capital of France is Paris." },
    { question: "Is 10 divisible by 2?", correctAnswer: "Yes", description: "10 is divisible by 2." },
  ];

  const totalQuestions = questions.length;

  const startQuiz = () => {
    setStart(true);
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowSummary(false);
    setTimeLeft(60); // Reset timer to 60 seconds
    setSelectedAnswers({});
  };

  const handleOptionChange = (value) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: value,
    });
  };

  const handleNext = () => {
    if (selectedAnswers[currentQuestionIndex] === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowSummary(true); // Show summary when finished
    }
  };

  const handlePageClick = (pageIndex) => {
    setCurrentQuestionIndex(pageIndex);
  };

  useEffect(() => {
    let timer;
    if (start && !showSummary) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timer);
            setShowSummary(true); // Show summary if time runs out
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [start, showSummary]);

  return (
    <div className="quiz-container min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 md:p-8 relative">
        {start ? (
          <>
            {showSummary ? (
              <SummaryScreen
                questions={questions}
                selectedAnswers={selectedAnswers}
                score={score}
                totalQuestions={totalQuestions}
                onRestart={startQuiz}
              />
            ) : (
              <div className="quiz-layout p-4 md:p-6 rounded-md text-center">
                {/* Question Number */}
                <div className="absolute top-4 left-4 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-100 text-lg md:text-2xl font-semibold text-green-600 border-2 border-green-600">
                  {currentQuestionIndex + 1}
                </div>

                {/* Quiz Title */}
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-4">
                  MODULE 2 - Lesson #7 PTM A - REVIEW QUIZ
                </h2>

                {/* Timer */}
                <h1 className="text-red-900 text-sm md:text-lg mb-2 md:mb-4">
                  Time Left: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
                </h1>

                {/* Question */}
                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                  {questions[currentQuestionIndex].question}
                </h3>

                {/* Options */}
                <div className="options mt-4 md:mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                  <button
                    className={`py-2 px-6 rounded-md cursor-pointer transition duration-300 ${
                      selectedAnswers[currentQuestionIndex] === 'Yes'
                        ? 'bg-[#081B29] text-white'
                        : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                    }`}
                    onClick={() => handleOptionChange('Yes')}
                  >
                    Yes
                  </button>

                  <button
                    className={`py-2 px-6 rounded-md cursor-pointer transition duration-300 ${
                      selectedAnswers[currentQuestionIndex] === 'No'
                        ? 'bg-[#081B29] text-white'
                        : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                    }`}
                    onClick={() => handleOptionChange('No')}
                  >
                    No
                  </button>
                </div>

                {/* Description */}
                <div className="mt-4 md:mt-6 border-t-2 border-gray-200 pt-4">
                  <p className="text-gray-600 text-sm md:text-base">{questions[currentQuestionIndex].description}</p>
                </div>

                {/* Next Button */}
                <div className="flex justify-end items-center mt-6 md:mt-8">
                  <button
                    className="bg-[#081B29] text-white py-2 px-6 rounded-md"
                    onClick={handleNext}
                    disabled={!selectedAnswers.hasOwnProperty(currentQuestionIndex)}
                  >
                    Next
                  </button>
                </div>

                {/* Correct Answer Score */}
                <div className="text-right text-gray-600 text-sm md:text-base mt-4">
                  Correct: {score}/{totalQuestions}
                </div>

                {/* Pagination - Bottom Left */}
                <div className="pagination flex justify-start space-x-2 mt-6">
                  {Array.from({ length: totalQuestions }, (_, i) => (
                    <button
                      key={i}
                      className={`bg-gray-200 text-gray-800 w-8 h-8 rounded-full ${
                        i === currentQuestionIndex ? 'bg-gray-600 text-white' : ''
                      }`}
                      onClick={() => handlePageClick(i)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center">
            <button
              className="bg-[#081B29] hover:bg-[#050E15] text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
              onClick={startQuiz}
            >
              Start Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
