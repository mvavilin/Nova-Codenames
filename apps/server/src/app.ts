import express, { type Request, type Response } from 'express';
import { createServer } from 'node:http';
import { userRouter } from './api/users.js';
import { errorHandler } from './middlewares/errorHandler.ts';
import { Endpoints, ServerConstants } from '@repo/shared/src/api.types.ts';
import { authRouter } from './api/auth.ts';
import cors from 'cors';
import 'dotenv/config';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const FRONTEND_URL = process.env.FRONTEND_URL || ServerConstants.DEFAULT_FRONTEND_URL;
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get(Endpoints.BASE, (_req: Request, res: Response) => {
  res.send('Hello world');
});

app.use(Endpoints.USERS, userRouter);
app.use('', authRouter);

app.use(errorHandler);

io.on('connection', (socket) => {
  console.log('connection', socket.id);
});

export default server;
