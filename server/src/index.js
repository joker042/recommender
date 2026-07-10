import express from 'express';
import cors from 'cors';
import pool from './db.js';
import showsRouter from './routes/shows.js';
import recommendationsRouter from './routes/recommendations.js';
import votesRouter from './routes/votes.js';
import tagsRouter from './routes/tags.js';
import authRouter from './routes/auth.js';
import watchlistRouter from './routes/watchlist.js';
import userMiddleware from './middleware/user.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());

app.set('trust proxy', true);

app.use(userMiddleware);

app.use('/api/shows', showsRouter);
app.use('/api/recommendations', recommendationsRouter);
app.use('/api/votes', votesRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/auth', authRouter);
app.use('/api/watchlist', watchlistRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { pool };
