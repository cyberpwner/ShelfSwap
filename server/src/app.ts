import express, { urlencoded } from 'express';
import cors from 'cors';

import routes from './routes/index.js';
import { RateLimiter } from './middleware/RateLimiter.middleware.js';
import { HttpStatusCode } from './types/http.types.d';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const rateLimiter = new RateLimiter();
app.use('/api', rateLimiter.rateLimiter);

app.use('/api', routes);

app.use('*', (_req: express.Request, res: express.Response) => {
  res.status(HttpStatusCode.NOT_FOUND).json({ error: 'End point not found' });
});

export default app;
