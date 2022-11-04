import { Request, Response } from 'express';
import { db } from '../db/db';

export const getPosts = (req: Request, res: Response) => {
  const category = req.query.category
    ? 'SELECT * FROM posts WHERE category=?'
    : 'SELECT * FROM posts';

  db.query(category, [req.query.category], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getPostById = (req: Request, res: Response) => {
  const q =
    'SELECT `username`, `title`, `description`, p.img, u.img AS userImg, `category`, `date`, `uid` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?';

  db.query(q, [req.params.id], (err, data: any) => {
    if (err) return res.json(err);
    return res.status(200).json(data[0]);
  });
};

export const addPost = (req: Request, res: Response) => {
  res.json('addPost');
};

export const deletePost = (req: Request, res: Response) => {
  res.json('getPost');
};

export const updatePost = (req: Request, res: Response) => {
  res.json('getPost');
};
