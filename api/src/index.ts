import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const multer = require('multer');
const path = require('path');

// Routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import postRoutes from './routes/posts';
import { cbType } from './types/cbTypes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: { originalname: string },
    cb: cbType
  ) {
    cb(null, path.join(__dirname, '../../client/public/upload'));
  },
  filename: function (req: any, file: { originalname: string }, cb: cbType) {
    const uniqueSuffix = Date.now() + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const checkFileType = (
  file: { originalname: string; mimetype: string },
  cb: cbType
) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(null, 'Images only please...');
  }
};

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req: any, res) => {
  res.status(200).json(req.file.filename);
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`connected http://localhost:${port}`);
});
