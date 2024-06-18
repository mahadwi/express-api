import jwt from "jsonwebtoken";
import db from "../models/index.js";

const User = db.user;

export const login = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }
  try {
    const user = await User.findOne({email});
    if(!user) {
      return res.status(401).send({messages: 'Invalid username or password'});
    }
    
    const isMatch = await user.comparePassword(password);
    if(!isMatch) {
      return res.status(401).send({messages: 'Invalid username or password'});
    }

    const payload = { id: user._id, email: user.email};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.send({messages: 'Login successful', token});
  } catch (error) {
    res.status(500).send({messages: error.message});
  }
}