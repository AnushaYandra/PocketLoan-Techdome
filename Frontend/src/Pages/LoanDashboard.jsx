import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loanData, setLoanData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUserDetails(userData);
    }
  }, []);

  const fetchLoanData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://pocketloan-techdome-assignment.onrender.com/api/admin/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setLoanData(data.loans);
        //console.log(loanData);
      } else {
        toast.error(data.error || 'Failed to fetch loan data.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanData();
  }, []);

  const handleApproval = async (loanId) => {
    console.log(loanId);
    const token = localStorage.getItem('token');
    try {
      
      const response = await fetch(`https://pocketloan-techdome-assignment.onrender.com/api/admin/dashboard/${loanId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        fetchLoanData(); 
      } else {
        toast.error(data.error || 'Failed to approve.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while approving the request.');
    }
  };

  return (
    <div className="responsive-background">
      <div className='flex items-center justify-center'>
        <h1 className='text-3xl font-semibold text-dark-brown mt-10'>All requested Loans</h1>
      </div>

      {userDetails ? (
        <section className="py-1 bg-blueGray-50">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white/30 w-full mb-6 shadow-custom rounded-xl ">
              <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr className='bg-very-lightblue'>
                      <th className="px-6 text-black/70 align-middle border border-solid border-blueGray-100 py-3 text-md border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">No.</th>
                      <th className="px-6 text-black/70 align-middle border border-solid border-blueGray-100 py-3 text-md border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Name</th>
                      <th className="px-6 text-black/70 align-middle border border-solid border-blueGray-100 py-3 text-md border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Loan Amount</th>
                      <th className="px-6 text-black/70 align-middle border border-solid border-blueGray-100 py-3 text-md border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Status</th>
                      <th className="px-6 text-black/70 align-middle border border-solid border-blueGray-100 py-3 text-md border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="5" className='text-center'>Loading...</td>
                      </tr>
                    ) : loanData && loanData.length > 0 ? (
                      loanData.map((loan, index) => (
                        <tr key={loan._id}>
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4">{loan.borrowName}</td>
                          <td className="px-6 py-4">{loan.amount}</td>
                          <td className="px-6 py-4">{loan.status}</td>
                          <td className="px-6 py-4">
                            {loan.status === 'PENDING' && (
                              <button onClick={() => handleApproval(loan._id)} 
                                className={`text-white px-4 py-2 rounded button shadow-custom ${loan.status !== 'PENDING' ? 'opacity-50' : ''}`}
                                style={{ cursor: loan.status !== 'PENDING' ? 'default' : 'pointer' }}
                              >
                                Approve
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className='text-center'>No loan requests found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className='text-center pt-12'>
          <h1 className='inline-block font-semibold text-lg text-dark-brown border-b-2 border-dashed border-brown'>Log in to check the status of your loan</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
