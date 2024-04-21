/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.get('/api/reviews', async (req, res, next) => {
  try {
    const sql = `
    select *
    from "reviews"
    order by "reviewId";`;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/reviews/:reviewId', async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    if (!reviewId || !Number.isInteger(+reviewId)) {
      throw new ClientError(400, 'reviewId required');
    }
    const sql = `
    select * from "reviews"
        where "reviewId" = $1;
    `;
    const params = [reviewId];
    const result = await db.query(sql, params);
    const review = result.rows[0];
    if (!review) {
      throw new Error(`entryId ${reviewId} not found`);
    }
    res.json(review);
  } catch (err) {
    next(err);
  }
});

app.post('/api/reviews', async (req, res, next) => {
  const userId = 1;
  try {
    const { title, review, rating, photoUrl } = req.body;
    const sql = `
    insert into "reviews" ("title", "review", "rating", "photoUrl", "userId")
    values ($1, $2, $3, $4, $5)
    returning *;`;
    if (!title || !review || !rating || !photoUrl) {
      throw new ClientError(
        400,
        'please enter title, review, rating, and photoUrl'
      );
    }
    const params = [title, review, rating, photoUrl, userId];
    const result = await db.query(sql, params);
    const [newReview] = result.rows;
    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
});

app.put('/api/reviews/:reviewId', async (req, res, next) => {
  try {
    const reviewId = Number(req.params.reviewId);
    if (!Number.isInteger(reviewId) || reviewId < 1) {
      throw new ClientError(400, 'reviewId must be a positive integer');
    }
    const { title, review, rating, photoUrl } = req.body;
    if (!title || !review || !rating || !photoUrl) {
      throw new ClientError(
        400,
        'please enter title, review, rating, and photoUrl'
      );
    }
    const sql = `
    update "reviews"
        set "title"=$1,
            "review"=$2,
            "rating"=$3,
            "photoUrl"=$4
     where "reviewId"=$5
    returning *;`;
    const params = [title, review, rating, photoUrl, reviewId];
    const result = await db.query(sql, params);
    const [updatedReview] = result.rows;
    if (!updatedReview) {
      throw new ClientError(404, `cannot find review with ${reviewId}`);
    }
    res.json(updatedReview);
    console.log('in here');
  } catch (err) {
    next(err);
  }
});

/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */
app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
