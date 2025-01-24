import express from 'express';
import cors from 'cors';

import routes from './routes/index.js';
import { RateLimiter } from './middleware/RateLimiter.middleware.js';
import { HttpStatusCode } from './types/http.types.d';

const app = express();

app.use(cors());
app.use(express.json());

const rateLimiter = new RateLimiter();
app.use('/api', rateLimiter.rateLimiter);

app.use('/api', routes);

app.use('*', (req: express.Request, res: express.Response) => {
  res.status(HttpStatusCode.NOT_FOUND).json({ message: 'End point not found' });
});

export default app;
