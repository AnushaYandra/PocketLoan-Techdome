import React from 'react'

const About = () => {
  return (
    <div className='px-6 py-6 flex flex-col items-center bg-cream responsive-about-background'>
        <h1 className='text-3xl font-semibold text-dark-brown mb-6 mt-8'>About Us</h1>
        <div className='w-full md:w-2/3 lg:w-2/5 p-5 md:p-10 bg-white/30 rounded-md border border-brown flex flex-col gap-5 items-center justify-center shadow-custom'>
              <p className='text-sm text-black/90'>
              <span className='text-md font-semibold text-dark-brown'>Pocket Loan</span>, is a mini-loan application designed for a seamless borrowing experience. 
              Authenticated users can easily apply for loans with minimal documentation and track their repayment schedules directly in the app. A secure authentication 
              system ensures that only verified users can access their accounts, making it a reliable platform for managing personal finances.
              </p>

              <p className='text-sm text-black/90'>
              The app features a user-friendly interface that simplifies the loan application process. Users can apply for loans with just a few clicks and enjoy a flexible 
              weekly repayment schedule. Once all repayments are made, the loan status is updated to "PAID," providing users with clarity on their financial obligations.
              </p>
      
              <p className='text-sm text-black/90'>
              <span className='text-md font-semibold text-dark-brown'>Pocket Loan</span> not only offers convenience but also promotes financial literacy by providing users 
              with insights into their borrowing habits and repayment strategies. The app empowers users with tools to budget effectively and manage their repayments efficiently. 
              With a strong focus on security and user empowerment, Pocket Loan stands out as an excellent choice for anyone seeking quick and manageable financial solutions, 
              allowing users to take control of their financial futures.
              </p>
        </div>
    </div>
  )
}

export default About
