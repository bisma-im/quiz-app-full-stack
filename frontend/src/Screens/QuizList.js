import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2 for modals
import Toast from '../components/Toast';

const QuizList = ({ quizzes, setQuizzes }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const quizzesPerPage = 10;

    const indexOfLastQuiz = currentPage * quizzesPerPage;
    const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
    const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

    const totalPages = Math.ceil(quizzes.length / quizzesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to handle the "Stop Quiz" action
    const handleStopQuiz = (quizTitle) => {
        Swal.fire({
            title: `Do you wish to Stop the quiz?`,
            text: quizTitle,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Quiz Stopped!', 'The quiz has been stopped.', 'success');
            }
        });
    };

    // Function to handle the "Delete Quiz" action
    const handleDeleteQuiz = (quizId, quizTitle) => {
        Swal.fire({
            title: `Do you wish to delete the quiz?`,
            text: quizTitle,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // Remove the quiz from the list if confirmed
                setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
                Swal.fire('Deleted!', 'The quiz has been deleted.', 'success');
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col p-4 sm:p-8">
            <div className="flex justify-end sm:mr-7 mb-4">
                <Menu as="div" className="relative">
                    <div>
                        <Menu.Button className="flex items-center bg-[#081B29] hover:bg-[#050E15] text-white rounded-full p-2 focus:outline-none text-sm h-12 sm:h-16">
                            <span>Account</span>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 w-48 py-2 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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

            <div className="flex-grow flex flex-col bg-gray-100 shadow-lg rounded-md p-4 sm:p-8">
                <div className="mb-6">
                    <Link className="bg-[#081B29] hover:bg-[#050E15] text-white py-2 px-4 rounded-md" to='/add-question'>
                        Create New Quiz
                    </Link>
                </div>
                <div className="flex-grow overflow-x-auto">
                    <table className="w-full border-collapse mb-4">
                        <thead>
                            <tr className="bg-gray-200 text-sm sm:text-base">
                                <th className="px-2 sm:px-4 py-2 text-left font-semibold">Quiz Title</th>
                                <th className="px-2 sm:px-4 py-2 text-left font-semibold">Responses</th>
                                <th className="px-2 sm:px-4 py-2 text-left font-semibold">Updated</th>
                                <th className="px-2 sm:px-4 py-2 text-left font-semibold">Status</th>
                                <th className="px-2 sm:px-4 py-2 text-left font-semibold">More</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentQuizzes.map((quiz) => (
                                <tr key={quiz.id} className="bg-white border-b hover:bg-gray-100 text-sm sm:text-base">
                                    <td className="px-2 sm:px-4 py-2">{quiz.title}</td>
                                    <td className="px-2 sm:px-4 py-2">{quiz.responses}</td>
                                    <td className="px-2 sm:px-4 py-2">{quiz.updated}</td>
                                    <td className="px-2 sm:px-4 py-2">{quiz.status}</td>
                                    <td className="px-2 sm:px-4 py-2">
                                        <DropdownMenu quiz={quiz} onStopQuiz={handleStopQuiz} onDeleteQuiz={handleDeleteQuiz} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4 text-sm sm:text-base">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage}</span>
                    <button
                        onClick={handleNextPage}
                        className="px-4 py-2"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

// Dropdown Menu Component
const DropdownMenu = ({ quiz, onStopQuiz, onDeleteQuiz }) => {
    const [showToast, setShowToast] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`Quiz Link for ${quiz.title}`);
        setShowToast(true);
    };

    return (
        <>
            <Menu as="div" className="relative">
                <div>
                    <Menu.Button className="inline-flex justify-center w-full text-sm font-medium text-gray-700">
                        ...
                    </Menu.Button>
                </div>
                <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    className=" z-50"
                >
                    <Menu.Items className="absolute right-0 w-48 py-2 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                                <Link to={'/add-question'} className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}>
                                    Edit
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a href="#" onClick={handleCopyLink} className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}>
                                    Copy Link
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link to={'/result'} className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}>
                                    Show Result
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    onClick={() => onStopQuiz(quiz.title)}
                                    className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                                >
                                    Stop
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    onClick={() => onDeleteQuiz(quiz.id, quiz.title)}
                                    className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                                >
                                    Delete
                                </a>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>

            {/* Toast for "Link Copied" */}
            <Toast show={showToast} message="Link Copied!" onClose={() => setShowToast(false)} />
        </>
    );
};

export default QuizList;
