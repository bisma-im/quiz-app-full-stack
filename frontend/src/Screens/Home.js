import React from 'react';
import logo from '../assets/logo.png'; // Placeholder for your logo
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      {/* Header */}
      <header className="flex justify-between items-center p-4 shadow-md">
        <div className="flex items-center">
          <img src={logo} className="w-16 h-16" alt="Logo" />
          <Link className="ml-4 text-[#081B29]" to='/signup'>Early Access</Link>
        </div>
        <div>
          <Link className="text-[#081B29]" to='/login'>Log In</Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center text-center px-4 py-8">
        {/* Title Section */}
        <h1 className="text-3xl font-bold mb-4">Build Your Quiz Forms In Minutes</h1>
        
        {/* Description */}
        <p className="mb-6 max-w-2xl">
          Description : Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        </p>
        
        {/* Image/Video Placeholder */}
        <div className="w-full max-w-lg h-64 bg-gray-300 mb-6 flex items-center justify-center">
          <span>Demo Image Or Video</span>
        </div>
        
        {/* Get Started Button */}
        <button className="bg-[#081B29] text-white py-2 px-6 rounded-md mb-6">Get Started</button>
        
        {/* Additional Description */}
        <div className="max-w-3xl text-sm">
          <p className="mb-2">Description : Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
          <p className="mb-2">Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
          <p>Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        Footer
      </footer>
      
    </div>
  );
};

export default Home;
