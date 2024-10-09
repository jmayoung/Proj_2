import { Router, Request, Response } from 'express';
import { User }  from '../models/index.js';  // Import the User model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import bcrypt for password hashing

// Register function to create a new user
export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log('Registering user:', username); // Log the username

  try {
    const existingUser = await User.findOne({ where: { username } });
    console.log('Existing user:', existingUser); // Log the existing user

    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    return res.status(201).json({ 
      message: 'User registered successfully',
      user: { id: newUser.id, username: newUser.username},
      token
     });
    
  } catch (error) {
    console.error('Error during registration:', error); // Log the error
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// Login function to authenticate a user
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;  // Extract username and password from request body

  // Find the user in the database by username
  const user = await User.findOne({
    where: { username },
  });

  // If user is not found, send an authentication failed response
  if (!user) {
    console.log("User not found")
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Compare the provided password with the stored hashed password
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json({ token });
};

// Create a new router instance
const router = Router();

// POST /register - Register a new user
router.post('/register', register);  // Define the registration route

// POST /login - Login a user
router.post('/login', login);  // Define the login route

export default router;  // Export the router instance