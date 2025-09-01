import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../services/jwtService';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (typeof decoded === 'string') {
    return res.status(401).json({ message: decoded });
  }

  req.user = decoded;
  next();
};
