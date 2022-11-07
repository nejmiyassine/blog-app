import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');

import { db } from '../db/db';
import { User } from './authController';

export const getPosts = (req: Request, res: Response) => {
  const category = req.query.category
    ? 'SELECT * FROM posts WHERE category=?'
    : 'SELECT * FROM posts';

  db.query(category, [req.query.category], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getPostById = (req: Request, res: Response) => {
  const getPostQuery =
    'SELECT p.id, `username`, `title`, `description`, p.img, u.img AS userImg, `category`, `date`, `uid` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?';

  db.query(getPostQuery, [req.params.id], (err, data: any) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const addPost = (req: Request, res: Response) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(
    token,
    'jwtkey',
    (err: string, userInfo: User & { id: number }) => {
      if (err) return res.status(403).json('Token is invalid');

      const insertPostQuery =
        'INSERT INTO posts(`title`, `description`, `img`, `category`, `date`,`uid`) VALUES (?)';

      const values = [
        req.body.title,
        req.body.description,
        req.body.img,
        req.body.category,
        req.body.date,
        userInfo.id,
      ];

      db.query(insertPostQuery, [values], (err, data) => {
        if (err) return res.status(403).json(err);
        console.log('add values', values);

        return res.json('Post has been created');
      });
    }
  );
};

export const deletePost = (req: Request, res: Response) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(
    token,
    'jwtkey',
    (err: string, userInfo: User & { id: number }) => {
      if (err) return res.status(403).json('Token is invalid');

      const postId = req.params.id;
      const deletePostQuery = 'DELETE FROM posts WHERE id = ? AND uid = ?';

      db.query(deletePostQuery, [postId, userInfo.id], (err, data) => {
        if (err) return res.status(403).json('You can delete only your posts!');

        return res.json('Post has been deleted');
      });
    }
  );
};

export const updatePost = (req: Request, res: Response) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(
    token,
    'jwtkey',
    (err: string, userInfo: User & { id: number }) => {
      if (err) return res.status(403).json('Token is invalid');

      const postId = req.params.id;

      const insertPostQuery =
        'UPDATE posts SET `title`=?, `description`=?, `img`=?, `category`=? WHERE `id`=? AND `uid`=?';

      const values = [
        req.body.title,
        req.body.description,
        req.body.img,
        req.body.category,
      ];

      console.log('values', values);

      db.query(
        insertPostQuery,
        [...values, postId, userInfo.id],
        (err, data) => {
          if (err) return res.status(403).json(err);

          return res.json('Post has been updated successfully');
        }
      );
    }
  );
};
