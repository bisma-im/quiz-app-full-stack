import './App.css';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Quiz from './Screens/Quiz'; // Named correctly as default export
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Screens/SignUp';
import AddQuestion from './Screens/AddQuestion';
import SummaryScreen from './Screens/SummaryScreen';
import ResultScreen from './Screens/ResultScreen';
import QuizList from './Screens/QuizList';
import { useState } from 'react';

function App() {
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "My New Quiz 1",
      description: "A sample quiz for demonstration",
      responses: 12,
      updated: "01 Sep 2024",
      status: "Active",
      questions: [
        {
          id: 1,
          title: "What is the capital of France?",
          choices: [
            { id: 1, text: "Berlin", isCorrect: false },
            { id: 2, text: "Madrid", isCorrect: false },
            { id: 3, text: "Paris", isCorrect: true },
            { id: 4, text: "Lisbon", isCorrect: false }
          ],
          explanation: "Paris is the capital of France."
        }
      ]
    }
  ]);

  // Function to handle saving a new quiz
  const saveNewQuiz = (newQuiz) => {
    console.log('save new quiz');
    // setQuizzes([...quizzes, { ...newQuiz, id: quizzes.length + 1 }]);
  };


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quizzes" element={<QuizList quizzes={quizzes} setQuizzes={setQuizzes} />} />
          <Route path="/add-question" element={<AddQuestion saveQuiz={saveNewQuiz}/>} />
          <Route path="/SummaryScreen" element={<SummaryScreen />} />
          <Route path="/result" element={<ResultScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
