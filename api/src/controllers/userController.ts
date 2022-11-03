import { Request, Response } from 'express';
import { db } from '../db/db';

export const userController = (req: Request, res: Response) => {
  const q = 'SELECT * FROM users';

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
