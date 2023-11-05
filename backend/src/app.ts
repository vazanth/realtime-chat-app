import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRouter from './routes/userRoutes';
import chatRouter from './routes/chatRoutes';
import messageRouter from './routes/messageRoutes';
import responseMiddleware from './middleware/responseMiddleware';
import AppResponse from './helpers/AppResponse';
import { commonResponseMessages } from './data/constants';

const app: Express = express();

app.use(cors());
// set security http headers
app.use(helmet());

// middleware for parsing request
app.use(express.json());

// api routes
app.use('/api/users', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/messages', messageRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  throw next(new AppResponse(commonResponseMessages.RESOURCE_NOT_FOUND));
});

// common response middleware
app.use(responseMiddleware);

export default app;
