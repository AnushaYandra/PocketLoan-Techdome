import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[username, setUsername] = useState("");
  const[role, setRole] = useState("admin");
  const navigate = useNavigate();
  

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://pocketloan-techdome-assignment.onrender.com/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            email,
            password,
            role,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success('You are successfully registered!');
        navigate('/login'); 
      } else {
        toast.error(data.error || 'Registration failed. Please try again.');
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
  <form onSubmit={handleRegister}>
    <div className='max-w-screen-2xl px-5 container mx-auto flex items-center justify-center bg-cream md:responsive-login-background min-h-screen'>
          <div className='w-3/4 md:w-2/5 lg:w-1/4 p-3 md:p-6 bg-white/30 rounded-md border border-brown flex flex-col gap-5 items-center justify-center shadow-custom'>
            
            <div className='flex flex-col items-center'>
                <h1 className='font-semibold text-2xl text-dark-brown'>Register 💰</h1>
            </div>
            
            <div className='flex flex-col gap-5 w-full'>
            <input 
                type='text' placeholder='Username*' value={username} onChange={(e)=> setUsername(e.target.value)}
                className='py-1 pl-3 border bg-white placeholder:text-sm border-brown rounded-lg focus:outline-none w-full placeholder:text-black/50' required
              />
              <input 
                type='email' placeholder='Email*' value={email} onChange={(e)=> setEmail(e.target.value)}
                className='py-1 pl-3 border bg-white placeholder:text-sm border-brown rounded-lg focus:outline-none w-full placeholder:text-black/50' required
              />
              <input 
                type='password' placeholder='Password*' value={password} onChange={(e)=> setPassword(e.target.value)}
                className='py-1 pl-3 border bg-white placeholder:text-sm border-brown rounded-lg focus:outline-none w-full placeholder:text-black/50' required
              />
              <select 
                className="py-1 pl-3 border bg-white placeholder:text-sm border-brown rounded-lg focus:outline-none w-full placeholder:text-black/50"
                onChange={(e)=> setRole(e.target.value)} 
                value={role}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            
            <button type='submit' className='button shadow-custom rounded-md py-1 px-6 w-full md:w-auto'>Register!</button>

            <div className='flex items-center justify-center gap-1 md:gap-2'>
                <h3 className='text-dark-brown'>Have an account?</h3>
                <Link to="/Login"> <button className='button shadow-custom rounded-md py-1 px-4 w-full md:w-auto' style={{ whiteSpace: 'nowrap' }}>Login</button> </Link>
            </div>
    
            <Link to="/" className='hover:underline hover:text-dark-green text-dark-brown'>Back to Home</Link>
          </div>
    </div>
  </form>
  )
}

export default Signup
