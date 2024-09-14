import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultScreen = () => {
  const questions = [
    {
      question: 'Is the underlined number correct according to the rule?',
      description: 'There were five contestants chosen as finalists.',
      options: [
        { answer: 'Answer A', percentage: '40%', isCorrect: true },
        { answer: 'Answer B', percentage: '25%', isCorrect: false },
        { answer: 'Answer C', percentage: '35%', isCorrect: false },
      ],
    },
    {
      question: 'Is the underlined number correct according to the rule?',
      description: 'There were five contestants chosen as finalists.',
      options: [
        { answer: 'Answer A', percentage: '30%', isCorrect: false },
        { answer: 'Answer B', percentage: '50%', isCorrect: true },
        { answer: 'Answer C', percentage: '20%', isCorrect: false },
      ],
    },
    {
      question: 'Is the underlined number correct according to the rule?',
      description: 'There were five contestants chosen as finalists.',
      options: [
        { answer: 'Answer A', percentage: '30%', isCorrect: false },
        { answer: 'Answer B', percentage: '50%', isCorrect: true },
        { answer: 'Answer C', percentage: '20%', isCorrect: false },
      ],
    },
    {
      question: 'Is the underlined number correct according to the rule?',
      description: 'There were five contestants chosen as finalists.',
      options: [
        { answer: 'Answer A', percentage: '30%', isCorrect: false },
        { answer: 'Answer B', percentage: '50%', isCorrect: true },
        { answer: 'Answer C', percentage: '20%', isCorrect: false },
      ],
    },
    {
      question: 'Is the underlined number correct according to the rule?',
      description: 'There were five contestants chosen as finalists.',
      options: [
        { answer: 'Answer A', percentage: '30%', isCorrect: false },
        { answer: 'Answer B', percentage: '50%', isCorrect: true },
        { answer: 'Answer C', percentage: '20%', isCorrect: false },
      ],
    },
  ];

  const chartData = {
    labels: questions.map((_, index) => `Q${index + 1}`),
    datasets: [
      {
        label: 'Number of Responses',
        data: [30, 40, 50, 35, 45, 60], // Example data
        backgroundColor: '#4CAF50',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10">
      <div className="w-full lg:w-3/4 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
          Result of My New Quiz 1
        </h2>
        <p className="text-lg mb-6 text-center">
          Number of Questions: {questions.length}
        </p>

        {/* Bar Chart */}
        <div className="w-full h-64">
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Question Summary */}
        <div className="bg-white text-gray-800 p-4 md:p-6 rounded-lg shadow-md mt-8 space-y-4 md:space-y-6">
          {questions.map((question, index) => (
            <div key={index} className="p-4 md:p-6 bg-gray-100 rounded-md">
              <h3 className="text-base md:text-lg font-semibold text-red-600 mb-2">
                {question.question}
              </h3>
              <p className="mb-4">{question.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {question.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={`p-3 flex justify-between items-center rounded-md ${
                      option.isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-900'
                    }`}
                  >
                    <span>{option.answer}</span>
                    <span>{option.percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
