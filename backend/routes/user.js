const express = require("express");
const router = express.Router();
const { z } = require('zod');
const User = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSignupSchema = z.object({
  name: z.string().min(3).max(32),
  email: z.string().email().min(6).max(64),
  password: z.string().min(8).max(32)
});

const userSigninSchema = z.object({
  email: z.string().email().min(6).max(64),
  password: z.string().min(8).max(32)
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!userSigninSchema.safeParse({ email, password }).success) {
    return res.status(400).send({
      message: 'Invalid user data'
    });
  }

  const user = await User.findOne({ email: email });

  console.log('user found:', user);

  if (!user) {
    return res.status(400).send({
      message: 'User does not exist'
    });
  }

  if (user.password !== password) {
    return res.status(400).send({
      message: 'Incorrect password'
    });
  }

  console.log('user id:', typeof user._id);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res
    .status(200)
    .send({ message: 'User signed in successfully',
      token: token });
});

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  console.log(`name: ${name} email: ${email} password: ${password}`);

  if (!userSignupSchema.safeParse({ name, email, password }).success) {
    return res.status(400).send({
      message: 'Invalid user data'
    });
  }

  const user = await User.findOne({ email: email });

  console.log('value of user', user);

  if (user) {
    return res.status(400).send({
      message: 'User already exists'
    });
  }

  const newUser = await User.create({
    name: name,
    email: email,
    password: password
  });

  if (newUser) {
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .send({ message: 'User created successfully',
        token: token });
  }
});

module.exports = router;