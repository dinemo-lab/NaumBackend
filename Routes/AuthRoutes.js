import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';
import { validateRegister, validateLogin } from '../Middleware/ValidateMiddleware.js';



const router = express.Router();

 
router.post('/register',validateRegister, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
 
    user = new User({
      name,
      email,
      password
    });

    await user.save();

   
    const token = jwt.sign(
        { 
          id: user._id, 
          name: user.name, 
          email: user.email 
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

 
router.post('/login', validateLogin,async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

 
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    const token = jwt.sign(
        { 
          id: user._id, 
          name: user.name, 
          email: user.email 
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;