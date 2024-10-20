const mongoose = require('mongoose');


/* Schema for repayments model */
const repaymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'PAID'], default: 'PENDING' }
});


/* Schema for loan model */
const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  term: { type: Number, required: true }, 
  borrowName: { type: String, required: true }, 
  status: { type: String, enum: ['PENDING', 'APPROVED', 'PAID'], default: 'PENDING' },
  scheduledRepayments: [repaymentSchema]
});

const Loan = mongoose.model('Loan', loanSchema);
module.exports = Loan;
