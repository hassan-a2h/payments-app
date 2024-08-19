const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { startSession } = mongoose;
require("dotenv").config();

const { Account } = require("../db");

//  Account Routes
router.get("/", async (req, res) => {
  return res.status(200).json("Account route is working");
});

router.get("/balance", async (req, res) => {
  const token = req.cookies.Authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  const account = await Account.findOne({ user: id });

  if (!account) {
    return res.status(404).json({
      message: "Account not found",
    });
  }

  console.log("account found for user:", account);

  console.log("Account route, balance:", account.balance);

  return res.status(200).json({
    balance: account.balance,
  });
});

router.post("/transfer", async (req, res) => {
  const { user, amount } = req.body;
  const token = req.cookies.Authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  try {
    //  use mongoose transcation to transfer funds
    const session = await mongoose.startSession();
    session.startTransaction();

    const senderAccount = await Account.findOne({ user: id }).session(session);
    const receiverAccount = await Account.findOne({ user: user }).session(
      session
    );

    if (!senderAccount || !receiverAccount || senderAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message:
          "Invalid transfer. Double check receiver, sender and transfer amount.",
      });
    }

    const roundedAmount = Math.floor(amount);
    senderAccount.balance -= roundedAmount;
    receiverAccount.balance += roundedAmount;
    await senderAccount.save({ session });
    await receiverAccount.save({ session });

    await session.commitTransaction();

    return res.status(200).json({
      message: `${roundedAmount} transferred to ${user} successfully`,
    });
  } catch (err) {
    console.log("Error in money transfer route, full error - ", err);
    await session.abortTransaction();
    return res
      .status(500)
      .json({ message: "An error occurred during the transfer" });
  }
});

module.exports = router;
