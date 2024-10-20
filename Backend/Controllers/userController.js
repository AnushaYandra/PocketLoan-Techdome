const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');


/* Register a new user */
exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword, role });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ error: 'Failed to register user' });
  }
};


/* Login a user */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const found = await bcrypt.compare(password, user.password);
    if (!found) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({ error: 'Failed to login' });
  }
};

