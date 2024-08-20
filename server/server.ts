/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import {
  ClientError,
  errorMiddleware,
  uploadsMiddleware,
} from './lib/index.js';
import { searchGif } from './lib/giphy.js';

const app = express();

// Static directory for file uploads server/public/
app.use(express.static('public'));
app.use(express.json());

app.get('/api/giphy/search', async (req, res, next) => {
  try {
    const resp = await searchGif();
    res.send(resp);
  } catch (err) {
    next(err);
  }
});

app.post(
  '/api/openAI/upload',
  uploadsMiddleware.single('image'),
  async (req, res, next) => {
    try {
      if (!req.file) throw new ClientError(400, 'no file field in request');
      res.json(req.file.filename);
    } catch (err) {
      next(err);
    }
  }
);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
