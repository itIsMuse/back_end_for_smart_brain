import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom'
import RingLoader from "react-spinners/RingLoader";
import { toast } from 'react-toastify';
import './App.css'



const SignIn = ({signedIn, onAuthenticate, loadUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate(); // For programmatic navigation

  
  const onEmailchange = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }


  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents form submission reload
    setLoading(true)
    fetch('faceecognitionapi-production.up.railway.app/signin', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
      .then((response) => {
        if (!response.ok) {
          toast.error('Invalid Credentials')
          throw new Error('Invalid credentials'); // Handle non-2xx responses
        }
        setLoading(false)
        signedIn()
        return response.json();
      })
      .then((userInfo) => {
        if (userInfo) {
          loadUser(userInfo)
          onAuthenticate();
          toast.success(`Welcome ${userInfo.name}`) // Log user info
        }
      })
      .catch((error) => {
        setLoading(false)
        alert('Unable to register')
        console.log(error)});
  };
  
  return (
    <div>
    {loading && (
      <div className="overlay">
        <RingLoader size={80} color="#4A90E2" />
      </div>
    )}
    <form className="max-w-sm mx-auto shadow-xl">
      <div className='mx-10 mb-5'>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input
            onChange={onEmailchange}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input
            onChange={onPasswordChange}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign in
        </button>
      </div>
    </form>
  </div>
);
};

// i just used this one to mark attendance oooo, i am not sure it work i just want it to show that i contributed something on monday
export default SignIn;


