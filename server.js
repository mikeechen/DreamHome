'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.disable('x-powered-by');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

//public directory
app.use(express.static(path.join(__dirname, 'public')));

// CSRF protection
app.use((req, res, next) => {
  if (/json/.test(req.get('Accept'))) {
    return next();
  }

  res.sendStatus(406);
});

//routes start here
app.use(require('./routes/users'));
app.use(require('./routes/token'));
//routes end here

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  // eslint-disable-next-line no-console
  console.error(JSON.stringify(err, null, 2));

  if (err.status) {
    return res
    .status(err.status)
    .set('Content-Type', 'text/plain')
    .send(err);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    //eslint-disable-next-line no console
    console.log('Listening on port', port);
  }
});

module.exports = app;
