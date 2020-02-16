const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const sortData = require('./routes/sort');
const app = express();
const isAuth = require('./middleware/isAuth');
const winston = require('winston');
const logger = require('./services/logger');
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-kl2sv.mongodb.net/${process.env.DB_DEFAULT}`
app.use((req,res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})
app.use(bodyParser.urlencoded({
  extended: false,
}))
app.use(bodyParser.json());
app.use('/assets',isAuth, express.static(path.join(__dirname, 'assets')));

app.use('/auth', authRoutes);
app.use('/', sortData);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({
    message,
    data
  })
})

mongoose.connect(
  MONGODB_URI
)
.then(result => {
  console.log('connection to DB stablished')
  const port = process.env.PORT;
  app.listen(port, () => {
    winston.log('info', `Listening on port ${port}`);
  })
})
.catch(err => console.log(err))