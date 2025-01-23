import express from 'express';
import cors from 'cors';

import routes from './routes/index.js';
import { RateLimiter } from './middleware/RateLimiter.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

const rateLimiter = new RateLimiter();
app.use('/api/', rateLimiter.rateLimiter);

app.use('/api', routes);

export default app;
