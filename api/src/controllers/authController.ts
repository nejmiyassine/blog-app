import { Request, Response } from 'express';
import { db } from '../db/db';

export const register = (req: Request, res: Response) => {
  const checkUser: string =
    'SELECT * FROM users WHERE email = ? or username = ?';

  db.query(checkUser, [req.body.email, req.body.username], (err, data) => {
    
  });
};

export const login = (req: Request, res: Response) => {};

export const logout = (req: Request, res: Response) => {};
