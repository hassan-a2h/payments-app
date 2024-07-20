const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { Account } = require('../db');

//  Account Routes  
router.get('/', async (req, res) => {
  return res
    .status(200)
    .json('Account route is working');
});

router.get('/balance', async (req, res) => {
  const token = req.cookies.Authorization.split(' ')[1];
  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  const account = await Account.findOne({ user: id });

  if (!account) {
    return res
      .status(404)
      .json({ 
        message: 'Account not found'
       });
  }

  return res
    .status(200)
    .json({
      balance: account.balance
    });
});

router.post('/transfer', async (req, res) => {
  const { user, amount } = req.body;
  const token = req.cookies.Authorization.split(' ')[1];
  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const senderAccount = await Account.findOne({ user: id });
    const receiverAccount = await Account.findOne({ user: user });

    if (!senderAccount || !receiverAccount || senderAccount.balance < amount) {
      return res
        .status(400)
        .json({ 
          message: 'Invalid transfer. Double check receiver, sender and transfer amount.'
         });
    }

    const roundedAmount = Math.floor(amount);
    senderAccount.balance -= roundedAmount;
    receiverAccount.balance += roundedAmount;
    await senderAccount.save();
    await receiverAccount.save();

    return res
      .status(200)
      .json({ message: `${roundedAmount} transferred to ${user} successfully` });
  } catch(err) {
    console.log('Error in money transfer route, full error - ', err);
  }
});

module.exports = router;