import { Request, Response } from 'express';
import { db } from '../db/db';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

interface User {
  username: string;
  email: string;
  password: string;
  birthdate: Date;
}

interface UserValues {
  [index: number]: User;
}

export const register = (req: Request, res: Response) => {
  // Check Existing User
  const checkUser: string =
    'SELECT * FROM users WHERE email = ? OR username = ?';

  db.query(checkUser, [req.body.email, req.body.username], (err, data: any) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json('User already exists!');
    console.log('register', data);

    // Hash Password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    // Insert User
    const insertUser =
      'INSERT INTO users(`username`,`email`,`password`) VALUES (?)';

    const userValues = [req.body.username, req.body.email, hashPassword];

    db.query(insertUser, [userValues], (err, data: any) => {
      if (err) return res.json(err);
      return res.status(200).json('User has been created.');
    });
  });
};

export const login = (req: Request, res: Response) => {
  const checkUser: string = 'SELECT * FROM users WHERE email = ?';

  db.query(checkUser, [req.body.email], (err, data: any) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json('User not found!');

    // Check Password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json('Wrong Email or Password');

    const token = jwt.sign(
      {
        id: data[0].id,
      },
      'jwtkey'
    );
    const { password, ...other } = data[0];

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req: Request, res: Response) => {};
