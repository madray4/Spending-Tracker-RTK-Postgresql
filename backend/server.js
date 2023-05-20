require('dotenv').config();

const express = require('express');
const userRoutes = require('./src/user/routes');
const entryRoutes = require('./src/entries/routes');

const app = express();

// middleware
// allows for json usage
app.use(express.json());

// CORs policy workaround
app.use((req, res, next) => {
  console.log('~~~ Request Type: ' + req.method + ', Path: ' + req.path);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/entries', entryRoutes);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log('~~~~ Server listening on port: ' + process.env.PORT);
});