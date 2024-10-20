import React, { useEffect, useState } from 'react';
import Banner from "../Components/Banner";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserData = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
          setUserDetails(JSON.parse(userData));
      }
    };
    fetchUserData();
  }, []);

  
  const borrowName = userDetails ? userDetails.username : ''; 
  //console.log(borrowName);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !term) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('You must be logged in to apply for a loan.');
        return;
      }
      
      const response = await fetch('https://pocketloan-techdome-assignment.onrender.com/api/userloan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
            amount,
            term,
            borrowName,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success('You have successfully applied for the loan!');
        navigate('/your-loan'); 
      } else {
        toast.error(data.error || 'Applying failed. Please try again.');
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while applying for the loan.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white responsive-background">
        <Banner />
        <div className="flex flex-col items-center justify-center md:gap-5 gap-3">
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-2/5">
            {/* Loan Amount Input */}
            <label htmlFor="amount" className="sr-only">Loan Amount</label>
            <input
              id="amount"
              type="number" 
              placeholder="Enter amount in rupees"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="py-1 px-3 border bg-white placeholder:text-sm border-brown rounded-lg focus:outline-none w-full placeholder:text-black/50"
              min="1" 
              required 
            />

            {/* Loan Term Input */}
            <label htmlFor="term" className="sr-only">Loan Term</label>
            <input
              id="term"
              type="number" 
              placeholder="Enter term in weeks"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="py-1 px-3 border bg-white placeholder:text-sm border-brown rounded-lg focus:outline-none w-full placeholder:text-black/50"
              min="1" 
              required 
            />
          </div>

          {/* Submit Button */}
          <div className="text-base font-medium flex items-center gap-3 w-full md:w-2/5">
            {userDetails ? (
              <button
                type="submit"
                className="button shadow-custom rounded-md py-1 px-6 w-full">
                Request Loan
              </button>
            ) : (
              <Link
                to="/login"
                className="py-1 px-5 mr-5 rounded button shadow-custom w-full text-center">
                Log in to Request Loan
              </Link>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Home;
