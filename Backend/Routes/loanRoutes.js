const express = require('express');
const {
  submitLoan,
  getUserLoans,
  submitRepayment,
  getAllLoans,
  approveLoan
} = require('../Controllers/loanController');

const { authenticate, isAdmin } = require('../Middleware/Auth');
const router = express.Router();

/* Loan request submitted by users */
router.post('/userloan', authenticate, submitLoan); 

/* Get Loan request submitted by logged-in user */
router.get('/userloan', authenticate, getUserLoans); 

/* Submit repayment by user */
router.post('/repayments/:loanId', authenticate, submitRepayment);

/* Get all the loan requests submitted by user for admins */
router.get('/admin/dashboard', authenticate, isAdmin, getAllLoans); 

/* Loan approval by admin */
router.patch('/admin/dashboard/:loanId', authenticate, isAdmin, approveLoan); 


module.exports = router;
