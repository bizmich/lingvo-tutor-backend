import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from '../env.ts';
import authRouter from './routes/auth.route.ts';
import userRouter from './routes/user.route.ts';
import wordRouter from './routes/word.route.ts';
import categoryRouter from './routes/category.route.ts';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use('/api/word', wordRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
