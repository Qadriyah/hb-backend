import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes';

const app = express();
dotenv.config();

// Set middlewares
app.use(bodyParser.json());

// Load routes
Object.entries(routes).forEach(([key, value]) => {
  app.use(`/api/${key}`, value);
});

// catch 404 and forwarding to error handler
app.use((_req, _res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
if (app.get('env') === 'development' || app.get('env') === 'test') {
  app.use((err, _req, res, next) => {
    res.status(err.status || 500);
    res.json({
      msg: err.message,
      error: err,
    });
    next();
  });
}

export default app;
