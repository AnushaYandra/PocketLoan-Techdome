import React from 'react';

export default function Footer() {
  return (
    <div className="container mx-auto text-sm border-t-2 border-dark-brown/20 ">
      <div className="bg-white p-6 mx-5">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="col-span-2">
            <div className="footer-text">
                <a href="/" className='flex items-center gap-3 text-2xl'>
                    <img src="/images/logo.png" className='h-10 w-10 shadow-md rounded-full' alt="Logo" />
                    <span className='font-extrabold text-lg text-dark-brown'>Pocket Loan</span>
                </a>
              <p className="text-gray-600 mt-2">Pocket Loan: Seamless borrowing made easy. Empowering users with tools for effective financial management.</p>
              <div className="flex space-x-4 mt-2">
                <i className="fa fa-facebook-official fa-lg cursor-pointer hover:text-[#957bda]"></i>
                <i className="fa fa-instagram fa-lg cursor-pointer hover:text-[#957bda]"></i>
                <i className="fa fa-twitter fa-lg cursor-pointer hover:text-[#957bda]"></i>
                <i className="fa fa-linkedin-square fa-lg cursor-pointer hover:text-[#957bda]"></i>
                <i className="fa fa-facebook cursor-pointer hover:text-[#957bda]"></i>
              </div>
            </div>
          </div>

          <div className="col-span-1">
          <h5 className="heading font-semibold">Banking Services</h5>
            <ul className="mt-2">
              <li className="text-gray-400 hover:text-dark-blue cursor-pointer">Personal Loans</li>
              <li className="text-gray-400 hover:text-dark-blue cursor-pointer">Savings Accounts</li>
              <li className="text-gray-400 hover:text-dark-blue cursor-pointer">Credit Cards</li>
              <li className="text-gray-400 hover:text-dark-blue cursor-pointer">Mortgage Services</li>
              <li className="text-gray-400 hover:text-dark-blue cursor-pointer">Investment Accounts</li>
              <li className="text-gray-400 hover:text-dark-blue cursor-pointer">Financial Planning</li>
            </ul>
          </div>

            <div className="col-span-1">
              <h5 className="heading font-semibold">Industries</h5>
              <ul className="mt-2">
                <li className="text-gray-400 hover:text-dark-blue cursor-pointer">Banking</li>
                <li className="text-gray-400 hover:text-dark-blue cursor-pointer">Insurance</li>
                <li className="text-gray-400 hover:text-dark-blue cursor-pointer">Investment</li>
                <li className="text-gray-400 hover:text-dark-blue cursor-pointer">FinTech</li>
              </ul>
            </div>
            
            <div className="col-span-1">
              <h5 className="heading font-semibold">Company</h5>
              <ul className="mt-2">
                <li className="text-gray-400 hover:text-dark-blue cursor-pointer">Our Mission</li>
                <li className="text-gray-400 hover:text-dark-blue cursor-pointer">Careers</li>
                <li className="text-gray-400 hover:text-dark-blue cursor-pointer">Privacy Policy</li>
                <li className="text-gray-400 hover:text-dark-blue cursor-pointer">Terms of Service</li>
              </ul>
            </div>


        </div>
        <div className="border-t-2 border-dark-brown/30 mb-4"></div>
        <div className="flex justify-between text-xs">
          <div>
            <p className="text-gray-500"><i className="fa fa-copyright"></i> 2024 copyright</p>
          </div>
          <div className="flex space-x-4 text-gray-500">
            <div className="hover:text-dark-blue cursor-pointer">Terms of Use</div>
            <div className="hover:text-dark-blue cursor-pointer">Privacy Policy</div>
            <div className="hover:text-dark-blue cursor-pointer">Cookie Policy</div>
          </div>
        </div>
      </div>
    </div>
  );
}
