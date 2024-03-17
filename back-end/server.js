import express from 'express';
import dbInstance from './utils/db';
/* module to start the server */

const app = express();

/* middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* listen to server */
app.listen(3000, (err) => {
  if (!err) {
    console.log('started server at port 3000');
  }
});
module.exports = app;
