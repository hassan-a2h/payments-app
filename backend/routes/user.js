const express = require("express");
const router = express.Router();
const { z } = require('zod');
const User = require('../db');
const jwt = require('jsonwebtoken');
const authCheck = require('../middleware');
require('dotenv').config();


//  Validation Schemas
const userSignupSchema = z.object({
  name: z.string().min(3).max(32),
  email: z.string().email().min(6).max(64),
  password: z.string().min(8).max(32)
});

const userSigninSchema = z.object({
  email: z.string().email().min(6).max(64),
  password: z.string().min(8).max(32)
});

const userUpdateSchema = z.object({
  name: z.string().min(3).max(32),
  password: z.string().min(8).max(32)
});


//  User Routes
router.put('/', authCheck, async (req, res) => {
  const { name, password } = req.body;

  // if (!userUpdateSchema.safeParse({ name, password }).success) {
  //   return res.status(400).send({
  //     message: 'Invalid user data'
  //   });
  // }

  const { id } = jwt.verify(req.cookies.Authorization.split(' ')[1], process.env.JWT_SECRET);

  const updateFields = {};
  if (name) updateFields.name = name;
  if (password) updateFields.password = password;

  const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

  if (!updatedUser) {
    return res.status(400).send({
      message: 'User does not exist'
    });
  }

  res
    .status(200)
    .send({ message: 'User updated successfully' });
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

  res.cookie('Authorization','Bearer ' + token, { httpOnly: true });

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