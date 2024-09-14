import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import SaveQuizModal from './SaveQuizModal';
import cross from './../assets/cross.png';

const AddQuestion = ({ saveQuiz }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null); // Track the question by ID
  const [editQuestion, setEditQuestion] = useState(null); // New state to store the current editing question
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [draggedChoiceIndex, setDraggedChoiceIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const addNewQuestion = () => {
    const newQuestion = {
      id: (questions.length + 1).toString(), // Unique ID based on length
      title: `Question ${questions.length + 1}`,
      description: '', // New field for the description
      questionText: '', // New field for the "Question" input
      choices: ['', '', ''],
      correctAnswer: null, // Track which choice is the correct answer
      explanation: '',
    };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestionId(newQuestion.id);
    setEditQuestion(newQuestion); // Set the new question as the currently editable one
  };

  // Save the current question before switching to another
  const saveCurrentQuestion = () => {
    if (selectedQuestionId && editQuestion) {
      const updatedQuestions = [...questions];
      const questionIndex = questions.findIndex((q) => q.id === selectedQuestionId);
      updatedQuestions[questionIndex] = editQuestion; // Save the current edit state
      setQuestions(updatedQuestions);
    }
  };

  // Handle setting the selected question in edit mode using the question's ID
  const handleSelectQuestion = (id) => {
    saveCurrentQuestion(); // Save changes before switching
    const selectedIndex = questions.findIndex((q) => q.id === id);
    setSelectedQuestionId(id); // Track the question by its unique ID
    setEditQuestion({ ...questions[selectedIndex] }); // Clone the question to edit
  };

  // Update the editable question in the editing panel without affecting the list directly
  const updateEditingQuestion = (key, value) => {
    const updatedQuestion = { ...editQuestion, [key]: value };

    // Directly set the value based on the specific field being updated
    setEditQuestion(updatedQuestion);

    // Also update the questions list to reflect the change immediately
    const updatedQuestions = questions.map((question) => {
      if (question.id === selectedQuestionId) {
        return { ...question, ...updatedQuestion };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // Save changes from the editing panel to the main question list
  const saveQuestionChanges = () => {
    const updatedQuestions = [...questions];
    const questionIndex = questions.findIndex((q) => q.id === selectedQuestionId);
    updatedQuestions[questionIndex] = editQuestion;
    setQuestions(updatedQuestions);
  };

  const addChoice = () => {
    const updatedChoices = [...editQuestion.choices, ''];
    setEditQuestion({ ...editQuestion, choices: updatedChoices });
  };

  const updateChoice = (index, value) => {
    const updatedChoices = [...editQuestion.choices];
    updatedChoices[index] = value;
    setEditQuestion({ ...editQuestion, choices: updatedChoices });
  };

  const removeChoice = (index) => {
    const updatedChoices = [...editQuestion.choices];
    updatedChoices.splice(index, 1);
    setEditQuestion({ ...editQuestion, choices: updatedChoices });
  };

  const selectCorrectAnswer = (index) => {
    setEditQuestion({ ...editQuestion, correctAnswer: index });
  };

  // Duplicate question functionality
  const duplicateQuestion = (question) => {
    saveCurrentQuestion(); // Save changes before duplicating

    const newQuestion = {
      ...question,
      id: (questions.length + 1).toString(),
      title: `${question.title} (Copy)`,
    };
    setQuestions([...questions, newQuestion]);
  };

  // Delete question functionality
  const deleteQuestion = (questionId) => {
    saveCurrentQuestion(); // Save changes before deletion

    const updatedQuestions = questions.filter((q) => q.id !== questionId);
    setQuestions(updatedQuestions);

    // Reset editing states if the current question is deleted
    if (questionId === selectedQuestionId) {
      setSelectedQuestionId(null);
      setEditQuestion(null);
    }
  };

  // Drag and drop handling for questions
  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDragEnter = (index) => {
    if (draggedItemIndex === null) return;
    const updatedQuestions = [...questions];
    const draggedItem = updatedQuestions[draggedItemIndex];
    updatedQuestions.splice(draggedItemIndex, 1);
    updatedQuestions.splice(index, 0, draggedItem);
    setDraggedItemIndex(index);
    setQuestions(updatedQuestions);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  // Drag and drop handling for choices
  const handleChoiceDragStart = (index) => {
    setDraggedChoiceIndex(index);
  };

  const handleChoiceDragEnter = (index) => {
    if (draggedChoiceIndex === null || selectedQuestionId === null) return;
    const updatedChoices = [...editQuestion.choices];
    const draggedChoice = updatedChoices[draggedChoiceIndex];

    // Check if the dragged choice was the correct answer
    const wasCorrectAnswer = editQuestion.correctAnswer === draggedChoiceIndex;

    updatedChoices.splice(draggedChoiceIndex, 1);
    updatedChoices.splice(index, 0, draggedChoice);

    // Update the correctAnswer index based on the new choice positions
    let newCorrectAnswer = editQuestion.correctAnswer;
    if (wasCorrectAnswer) {
      newCorrectAnswer = index; // The correct answer follows the dragged choice
    } else if (editQuestion.correctAnswer > draggedChoiceIndex && editQuestion.correctAnswer <= index) {
      newCorrectAnswer = editQuestion.correctAnswer - 1; // Shift the correct answer index down
    } else if (editQuestion.correctAnswer < draggedChoiceIndex && editQuestion.correctAnswer >= index) {
      newCorrectAnswer = editQuestion.correctAnswer + 1; // Shift the correct answer index up
    }

    setEditQuestion({ ...editQuestion, choices: updatedChoices, correctAnswer: newCorrectAnswer });
    setDraggedChoiceIndex(index);
  };

  const handleChoiceDragEnd = () => {
    setDraggedChoiceIndex(null);
  };

  // Find the position of the currently selected question by its ID
  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId); // Get the selected question object

  const mobileStyle = `
  @media (max-width: 768px) {
    .flex-container {
      flex-direction: column;
      padding: 10px;
    }
    .question-panel, .detail-panel {
      width: 100%;
      padding: 10px;
      margin-left: 0px;
      margin-top: 5px;
    }
    .question-item {
      padding: 12px;
      font-size: 16px;
    }
    .btn {
      padding: 12px 24px;
    }
  }
  `;

  return (
    <div className="flex min-h-screen bg-gray-100 relative p-24 flex-container">
      <style>{mobileStyle}</style>

      {/* Account Button */}
      <div className="absolute md:top-4 md:right-4 max-sm:right-5 max-sm:top-7">
        <Menu as="div" className="relative md:right-20">
          <div>
            <Menu.Button className="flex items-center bg-[#081B29] hover:bg-[#050E15] text-white rounded-full p-2 focus:outline-none text-sm h-16">
              <span>Account</span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-48 py-2 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <Menu.Item>
                {({ active }) => (
                  <a href="#" className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}>
                    Account Settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a href="#" className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}>
                    Sign Out
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div className="question-panel w-1/3 bg-white shadow-md p-4">
        <input
          name="quiz-name"
          placeholder="Quiz Name"
          className="text-xl font-semibold rounded-md mt-3 p-2 bg-gray-200 w-2/3"
        />
        <br />
        <button
          className="bg-[#081B29] hover:bg-[#050E15] text-white py-2 px-4 rounded-md my-4"
          onClick={addNewQuestion}
        >
          Add Question
        </button>

        {/* Draggable List of Questions */}
        <div className="space-y-2">
          {questions.map((question) => (
            <div
              key={question.id}
              className="mb-2 bg-gray-200 p-3 rounded-md flex justify-between items-center cursor-pointer"
              draggable
              onDragStart={() => handleDragStart(questions.indexOf(question))}
              onDragEnter={() => handleDragEnter(questions.indexOf(question))}
              onDragEnd={handleDragEnd}
              onClick={() => handleSelectQuestion(question.id)} // Track by ID
            >
              <span>{question.title}</span>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex items-center">
                    <span className="text-2xl">...</span>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="z-10 absolute right-0 w-32 py-2 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } group flex rounded-md items-center w-full px-4 py-2 text-sm`}
                            onClick={(e) => {
                              e.stopPropagation();
                              duplicateQuestion(question);
                            }}
                          >
                            Duplicate
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } group flex rounded-md items-center w-full px-4 py-2 text-sm`}
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteQuestion(question.id);
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          ))}
        </div>
      </div>

      <div className="detail-panel w-2/3 bg-white shadow-md p-6 ml-4">
        <div className="absolute md:right-28 md:top-28">
          <button
            className="py-2 px-4 rounded-md bg-[#081B29] hover:bg-[#050E15] text-white"
            onClick={() => setShowModal(true)}
          >
            Save Quiz
          </button>
        </div>
        {editQuestion ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
            Editing: {selectedQuestion ? selectedQuestion.title : ''}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description:
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                value={editQuestion.description}  // Bind description field
                onChange={(e) => updateEditingQuestion('description', e.target.value)}  // Update description directly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Question:
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                value={editQuestion.questionText}  // Bind questionText
                onChange={(e) => updateEditingQuestion('questionText', e.target.value)} // Update questionText directly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Choices:
              </label>
              <div className='flex'>
              <label className="block text-gray-700 text-[8px]  font-bold mb-2">
                Correct Answer
              </label>
              </div>

              {editQuestion.choices.map((choice, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2"
                  draggable
                  onDragStart={() => handleChoiceDragStart(index)}
                  onDragEnter={() => handleChoiceDragEnter(index)}
                  onDragEnd={handleChoiceDragEnd}
                >
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={editQuestion.correctAnswer === index} // Only one can be selected
                    onChange={() => selectCorrectAnswer(index)}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    className="border rounded w-full py-2 px-3 mx-10 hover:cursor-pointer"
                    value={choice}
                    onChange={(e) => updateChoice(index, e.target.value)}
                  />
                  <button onClick={() => removeChoice(index)} className="ml-2 text-red-500">
                    <img src={cross} className='w-16'/>
                  </button>
                </div>
              ))}
              <button
                onClick={addChoice}
                className="bg-[#081B29] hover:bg-[#050E15] text-white py-1 px-4 rounded-md mt-2"
              >
                Add Choice
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Explanation:
              </label>
              <textarea
                className="border rounded w-full py-2 px-3"
                value={editQuestion.explanation}  // Bind explanation
                onChange={(e) => updateEditingQuestion('explanation', e.target.value)}
              />
            </div>
            <button
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md"
              onClick={saveQuestionChanges} // Save changes to the main question list
            >
              Save Changes
            </button>
          </div>
        ) : (
          <p>Select a question to edit details</p>
        )}
        {showModal && <SaveQuizModal questions={questions} onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
};

export default AddQuestion;
