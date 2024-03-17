import express from 'express';
import dbInstance from './utils/db';
/* module to start the server */

const app = express();
app.listen(3000, (err) => {
  if (!err) {
    console.log('started server at port 3000');
  }
});
module.exports = app;
