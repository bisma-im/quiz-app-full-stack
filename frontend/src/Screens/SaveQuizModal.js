import React, { useState } from 'react';

const SaveQuizModal = ({ questions, onClose }) => {
    const [linkCopied, setLinkCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText("Your Quiz Link"); // Replace with actual quiz link
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000); // Show 'Copied' for 2 seconds
    };

    return (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50 min-w-lg">
            <div className="bg-gray-100 text-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl mb-4">Title</h2>
                
                <div className="mb-4 flex items-center space-x-2">
                    <input
                        type="text"
                        readOnly
                        value="http://localhost:3000/" // Replace with actual shared link if needed
                        className="bg-gray-300 text-gray-700 px-3 py-2 rounded w-full"
                    />
                    <button
                        onClick={handleCopyLink}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        {linkCopied ? "Copied" : "Copy"}
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                        View
                    </button>
                </div>
                
                <div className="mb-4">
                    <p className='text-black'>{questions.length} Questions</p> {/* Display number of questions */}
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveQuizModal;