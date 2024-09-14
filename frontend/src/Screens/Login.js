import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onLogin = async (e) => {
        e.preventDefault();
        if (email === 'admin@admin.com' && password === 'Admin@786') {
            //proceed to quiz list
            navigate('/quizzes');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Invalid credentials'
            });
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-8 m-8 bg-gray-100 justify-content-center shadow-lg rounded-md w-full max-w-lg h-auto">
            <h1 className='text-2xl text-center mb-3'>Sign in</h1>

                <h2 className="text-lg text-gray-700 font-semibold mb-3 text-center">Unlock hundreds more features</h2>
                <p className="text-md text-gray-700 mb-8 text-center">Save your Quiz to the Dashboard View and Export Results</p>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" onClick={onLogin} className="w-full mt-6 bg-[#081B29] hover:bg-[#050E15] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log in</button>
                    <p className="text-md text-gray-700 mt-4">Don't have an account? <Link to='/signup' className='text-blue-500'>Sign up</Link></p>

                </form>
            </div>
        </div>
    );
}

export default Login;
