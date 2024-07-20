const express = require("express");
const router = express.Router();
const userRouter = require('./user');
const accountRouter = require('./account');
const authCheck = require('../authMiddleware');

router.use('/user', userRouter);
router.use('/account', authCheck, accountRouter);

module.exports = router;