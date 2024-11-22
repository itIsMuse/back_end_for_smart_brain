import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = ({onRouteChange, onAuthenticate}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // For programmatic navigation

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulate a successful login check (replace with real auth logic)
    if (email === "user@example.com" && password === "password123") {
      onAuthenticate(); // Call the parent function to set authenticated state
      navigate("/home"); // Redirect to home after successful sign-in
    } else {
      alert("Invalid login credentials");
    }
  };
  return (
<form className="max-w-sm mx-auto shadow-xl">
  <div className='mx-10 mb-5'>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
 
  <button onClick={onAuthenticate} type="submit" className=" mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
</div>
</form>
  );
};

export default SignIn;