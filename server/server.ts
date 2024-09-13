/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import {
  ClientError,
  errorMiddleware,
  uploadsMiddleware,
} from './lib/index.js';
import { searchGif } from './lib/giphy.js';
import { openAIImageMiddleware } from './lib/openai-middleware.js';
import cron from 'node-cron';
import fs from 'fs';
import path from 'path';

cron.schedule('0 0 * * *', () => {
  const directory = path.join(__dirname, 'public/images');

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    for (const file of files) {
      const filePath = path.join(directory, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error reading file stats for ${file}:`, err);
          return;
        }

        const now = Date.now();
        const fileAge = (now - new Date(stats.mtime).getTime()) / (1000 * 60);

        if (fileAge > 60) {
          // 1 hour
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Failed to delete file: ${file}`, err);
            } else {
              console.log(`File deleted: ${file}`);
            }
          });
        }
      });
    }
  });
});

const app = express();

const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(uploadsStaticDir));
app.use(express.static(reactStaticDir));

// Static directory for file uploads server/public/
app.use(express.static('public'));
app.use(express.json({ limit: '2mb' }));

app.get('/api/giphy/search/:query', async (req, res, next) => {
  try {
    const query = req.params.query;
    const resp = await searchGif(query);
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
      const filepath = req.file.path;
      const aiResponse = await openAIImageMiddleware(filepath);
      res.json({ aiResponse, fileName: req.file.filename });
    } catch (err) {
      next(err);
    }
  }
);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
