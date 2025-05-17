const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
});

// Register (optional - for testing)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({ name, email, password: hashedPassword, role });

  await user.save();
  res.status(201).json({ message: 'User created' });
});

module.exports = router;
