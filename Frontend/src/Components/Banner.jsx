import React, { useState } from 'react'

function Banner() {
 
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-5 mt-5'>
      <div className='flex flex-col items-center justify-center gap-5 md:gap-3'>
         <div className='flex items-end justify-center md:gap-3'>
           <h1 className='text-3xl md:text-5xl font-semibold text-dark-brown mb-3'> Small Loans! Big Dreams:</h1>
           <p className= 'text-xl md:text-3xl font-semibold text-light-blue mb-3'>Finance your future</p>
         </div>
   
         <p className='text-sm w-full md:w-2/3 text-black/80 md:block'>Welcome to Pocket Loan, your reliable and user-friendly platform for managing loans 
         with ease. Whether you’re applying for a loan or making weekly repayments, Pocket Loan simplifies the entire process. Once your loan is approved, you 
         can easily track your repayment schedule and stay on top of your finances. Pocket Loan to provides a secure and seamless experience, making loan 
         management stress-free and efficient for all our users.
         </p>

         <img src='/images/LP.png' className='w-64 md:w-[20rem] lg:w-[27rem] rounded-3xl object-cover'></img>
      </div>
    </div>
  )
}

export default Banner