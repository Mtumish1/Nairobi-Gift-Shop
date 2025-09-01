import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../../services/hashService';

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const hashedPassword = await hashPassword(password);

    // TODO: Save user to the database
    console.log({ email, hashedPassword, name });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // TODO: Find user in the database and compare password
    console.log({ email, password });

    // TODO: Generate and return JWT
    res.status(200).json({ message: 'User logged in successfully', token: 'dummy-jwt-token' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error });
  }
};

export const getMe = (req: Request, res: Response) => {
  res.status(200).json(req.user);
};
