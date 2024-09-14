import React from 'react';

const SummaryScreen = ({ questions, selectedAnswers, score, totalQuestions, onRestart }) => {
  const calculatePercentage = () => Math.round((score / totalQuestions) * 100);

  return (
    <div className="summary bg-gray-200 p-8 rounded-lg text-center">
      <div className="bg-gray-700 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Score {score}/{totalQuestions} ({calculatePercentage()}%)</h1>
        <p className="text-md font-medium mb-6">THANKS FOR TAKING THIS QUIZ!</p>
        <p className="text-sm mb-8">
          Review all incorrect responses. Once you understand why all incorrect responses were incorrect, begin the next lesson. If you scored 91–100% on this lesson, you do not need to retake this PTM. If you did not score 91–100% on this lesson, reattempt this PTM A exercise until you score 91–100%.
        </p>
      </div>

      {/* Detailed breakdown of questions */}
      <div className="mt-8">
        {questions.map((question, index) => (
          <div
            key={index}
            className="p-4 mb-6 bg-gray-100 shadow-lg rounded-md text-left"
          >
            <h3 className="font-semibold text-left text-red-600 mb-2">
              Is the underlined number correct according to the rule?
            </h3>

            <p className="mt-2 text-gray-900">
              {question.question}
            </p>

            {/* User's selected answer */}
            <div className="mt-4 flex space-x-4 justify-center w-full">
              <button
                className={`py-2 px-8 rounded-md ${
                  selectedAnswers[index] === 'Yes'
                    ? selectedAnswers[index] === question.correctAnswer
                      ? 'bg-green-600 text-white'
                      : 'bg-red-600 text-white'
                    : 'bg-gray-300 text-gray-800'
                }`}
                disabled
              >
                Yes
              </button>

              <button
                className={`py-2 px-8 rounded-md ${
                  selectedAnswers[index] === 'No'
                    ? selectedAnswers[index] === question.correctAnswer
                      ? 'bg-green-600 text-white'
                      : 'bg-red-600 text-white'
                    : 'bg-gray-300 text-gray-800'
                }`}
                disabled
              >
                No
              </button>
            </div>

            {/* Explanation text below */}
            <div className="mt-4 text-sm text-left text-gray-600">
              {question.description}
            </div>
          </div>
        ))}
      </div>

      {/* Restart button */}
      <div className="flex justify-center">
        <button
          className="bg-[#081B29] mt-7 hover:bg-[#050E15] text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
          onClick={onRestart}
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default SummaryScreen;
