const express = require('express');
require('dotenv').config();


const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(express.json());

// cross origin resource sharing
// error handling
app.use(middlewares.allowCrossDomain)

app.use(logger);
app.use(cookieParser());
app.use(errorHandler);
// app.use(verifyJWT);


app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to sparkstore'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;