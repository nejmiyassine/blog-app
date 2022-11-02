import { Request, Response } from 'express';

export const postController = (req: Request, res: Response) => {
  res.json('This is postController');
};
