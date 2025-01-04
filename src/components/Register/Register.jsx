import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Register = ({onAuthenticate, handleRegister}) => {
const [email, setEmail] = useState('')
const [name , setName] = useState('')
const [password, setPassword] = useState('')

const onEmailChange = (event) =>{
  setEmail(event.target.value)
}


const onPasswordChange = (event) =>{
  setPassword(event.target.value)
}


const onNameChange = (event) =>{
  setName(event.target.value)
}

const sendInfo = () => {
  event.preventDefault()
  fetch('https://face-ecognition-api.onrender.com/register', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    })
  })
    .then(async (response) => {
      if (response.status === 200) {
        const data = await response.json();
        toast.success('Registration successful! 🎉');
        handleRegister(data);
        handleRegister() // Pass the response data to handleRegister
      } else if (response.status === 400) {
        const error = await response.text();
        toast.error(`Registration failed: ${error}`);
      } else {
        toast.error('An unexpected error occurred.');
      }
    })
    .catch((error) => {
      toast.error('Failed to connect to the server.');
    })
 
  }
  return (
    <div>
<form className="max-w-sm mx-auto shadow-xl">
  <div className='mx-10 mb-5'>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
    <input onChange={onNameChange}  type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Museya" required />
  </div>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input onChange= {onEmailChange} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@museya.com" required />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input onChange={onPasswordChange} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <button onClick={sendInfo} type="submit" className=" mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
</div>
</form>
    </div>
  )
}

export default Register
