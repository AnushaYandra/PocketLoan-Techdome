import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const response = await fetch('https://pocketloan-techdome-assignment.onrender.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });


        if (!response.ok) {
          const errorData = await response.json(); // Try to parse the error response
          throw new Error(errorData.error || 'An error occurred'); // Handle error
          toast.error('An error occurred');
        }
    
        const data = await response.json();
    
        if (response.ok) {
          const { token, user } = data;

          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          toast.success('You are succesfully Logged in!');
          navigate('/'); 
        } else {
          console.error(data.error);
          toast.error(data.error);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error(data.error);
      }
    }
  
    return (
    <form onSubmit={handleSubmit}>
      <ToastContainer/>
      <div className='max-w-screen-2xl px-5 container mx-auto flex items-center justify-center md:responsive-login-background bg-very-lightblue min-h-screen'>
            <div className='w-3/4 md:w-2/5 lg:w-1/4 p-3 md:p-10 bg-white/20 rounded-md border border-brown flex flex-col gap-5 items-center justify-center shadow-custom'>
              
              <div className='flex flex-col items-center'>
                  <h1 className='font-semibold text-2xl text-dark-brown'>Log in 💰</h1>
              </div>
              
              <div className='flex flex-col gap-5 w-full'>
                <input 
                  type='email' placeholder='Email*' value={email} onChange={(e)=> setEmail(e.target.value)}
                  className='py-1 pl-3 border bg-white placeholder:text-sm border-brown rounded-lg focus:outline-none w-full placeholder:text-black/50' required
                />
                <input 
                  type='password' placeholder='Password*' value={password} onChange={(e)=> setPassword(e.target.value)}
                  className='py-1 pl-3 border bg-white placeholder:text-sm border-brown rounded-lg focus:outline-none w-full placeholder:text-black/50' required
                />
              </div>
              
              <button type='submit' className='button shadow-custom rounded-md w-full md:w-auto'>Login</button>
  
              <div className='flex items-center justify-center gap-2'>
                  <h3 className='text-dark-brown'>New user?</h3>
                  <Link to="/Signup"> <button className='button shadow-custom rounded-md w-full md:w-auto'>Register</button> </Link>
              </div>
      
              <Link to="/" className='hover:underline hover:text-dark-blue text-dark-brown'>Back to Home</Link>
            </div>
      </div>
    </form>
    )
  }
  
  export default Login
