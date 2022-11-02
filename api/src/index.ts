import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
// Routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import postRoutes from './routes/posts';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`connected https://localhost:${port}`);
});
