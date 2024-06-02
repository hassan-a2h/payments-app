const express = require("express");
const router = express.Router();
const z = require('zod');

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

});

module.exports = router;