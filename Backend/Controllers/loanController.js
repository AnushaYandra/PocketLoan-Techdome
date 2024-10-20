const Loan = require('../Models/Loan');


/* Submit a loan application */
exports.submitLoan = async (req, res) => {
  const { amount, term, borrowName } = req.body;
  const repaymentAmount = (amount / term).toFixed(2);
  let repayments = [];
  let today = new Date();

  for (let i = 1; i <= term; i++) {
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + i * 7);

    repayments.push({
      amount: i === term ? parseFloat((amount - repaymentAmount * (term - 1)).toFixed(2)) : parseFloat(repaymentAmount),
      dueDate: dueDate
    });
  }

  try {
    const loan = new Loan({
      userId: req.user.id,
      amount,
      term,
      borrowName,
      scheduledRepayments: repayments
    });
    await loan.save();
    res.status(201).json({ message: 'Loan application submitted successfully', loan });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit loan application' });
  }
};


/* Retrieve loans for the currently logged-in user */
exports.getUserLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user.id });
    res.status(200).json({ loans });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve loans' });
  }
};


/* Pay the scheduled repayment for a specific loan */
exports.submitRepayment = async (req, res) => {
  const { repaymentAmount } = req.body;
  const { loanId } = req.params;

  try {
    const loan = await Loan.findById(loanId);
    console.log(loan);
    
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    if (loan.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to make repayment for this loan' });
    }

    const nextRepayment = loan.scheduledRepayments.find(r => r.status === 'APPROVED');

    if (!nextRepayment) {
      return res.status(400).json({ error: 'All repayments for this loan are already completed' });
    }

    if (repaymentAmount < nextRepayment.amount) {
      return res.status(400).json({ error: 'Repayment amount must be equal or greater than the due amount' });
    }

    nextRepayment.status = 'PAID';
    await loan.save();

    if (loan.scheduledRepayments.every(r => r.status === 'PAID')) {
      loan.status = 'PAID';
      await loan.save();
    }

    res.status(200).json({ message: 'Repayment successfully submitted', loan });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit repayment' });
  }
};


/* Get all loan requests for Admins */
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.status(200).json({ loans });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve loan requests' });
  }
};


/* Approve a loan request - Admins */
exports.approveLoan = async (req, res) => {
  console.log('Request Params:', req.params); 
  const { loanId } = req.params;
  console.log(`Approving loan with ID: ${loanId}`); 

  try {
    const loan = await Loan.findById(loanId);
    console.log('Found loan:', loan);

    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    loan.status = 'APPROVED';

    loan.scheduledRepayments.forEach((repayment) => {
      repayment.status = 'APPROVED'; 
    });

    await loan.save();
    res.status(200).json({ message: 'Loan approved successfully', loan });
  } catch (err) {
    console.error('Error approving loan:', err); 
    res.status(500).json({ error: 'Failed to approve loan' });
  }
};
