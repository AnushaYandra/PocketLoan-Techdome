const React = require('react');
const { useEffect, useState } = React;
const { useNavigate } = require('react-router-dom');
const { toast } = require('react-toastify');

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loanData, setLoanData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUserDetails(userData);
    } else {
      navigate('/login'); // Redirect to login if user is not authenticated
    }
  }, [navigate]);

  const fetchLoanData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/userloan', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setLoanData(data.loans[0]);
      } else {
        toast.error(data.error || 'Failed to fetch loan data.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('An error occurred while fetching loan data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanData();
  }, []);

  const handlePayment = async (repaymentId, repaymentAmount) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/api/repayments/${loanData._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ repaymentAmount }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        fetchLoanData();
      } else {
        toast.error(data.error || 'Failed to submit repayment.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('An error occurred while submitting the repayment.');
    }
  };

  return (
    <div className="responsive-background">
      <div className='flex items-center justify-center'>
        <h1 className='text-3xl font-semibold text-dark-brown mt-10'>Your scheduled repayments</h1>
      </div>
      {userDetails && loanData && <h2 className='text-center font-semibold text-dark-blue text-lg mt-5'> Total Amount : ₹ {loanData.amount}</h2>}

      {userDetails ? (
        <section className="py-1 bg-blueGray-50">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white/30 w-full mb-6 shadow-custom rounded-xl ">
              <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr className='bg-very-lightblue'>
                      <th scope="col" className="px-6 text-black/70 align-middle border border-solid border-blueGray-100 py-3 text-md border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Term No.</th>
                      <th scope="col" className="px-6 text-black/70 align-middle border border-solid border-blueGray-100 py-3 text-md border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Repayment Amount</th>
                      <th scope="col" className="px-6 text-black/70 align-middle border border-solid border-blueGray-100 py-3 text-md border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Due Date</th>
                      <th scope="col" className="px-6 text-black/70 align-middle border border-solid border-blueGray-100 py-3 text-md border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Status</th>
                      <th scope="col" className="px-6 text-black/70 align-middle border border-solid border-blueGray-100 py-3 text-md border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="5" className='text-center'>Loading...</td>
                      </tr>
                    ) : loanData ? (
                      loanData.scheduledRepayments.length > 0 ? loanData.scheduledRepayments.map((repayment, index) => (
                        <tr key={repayment._id}>
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4">{repayment.amount}</td>
                          <td className="px-6 py-4">{new Date(repayment.dueDate).toLocaleDateString()}</td>
                          <td className="px-6 py-4">{repayment.status}</td>
                          <td className="px-6 py-4">
                            {repayment.status === 'APPROVED' && (
                              <button
                                onClick={() => handlePayment(repayment._id, repayment.amount)}
                                className={`text-white px-4 py-2 rounded button shadow-custom`}
                                style={{ cursor: 'pointer' }}
                              >
                                Pay
                              </button>
                            )}
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="5" className='text-center'>No scheduled repayments found.</td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td colSpan="5" className='text-center py-5'>No loan found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <p className='text-center'> You will be able to repay the loan once it has been approved.</p>
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
