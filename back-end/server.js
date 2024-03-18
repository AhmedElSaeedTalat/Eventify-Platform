import express from 'express';
import session from 'express-session';
import { v4 } from 'uuid';
import dbInstance from './utils/db';
import routes from './routes/index';
/* module to start the server */

const printMethod = (req, res, next) => {
  console.log(`${req.method}: ${req.url}, status code: ${res.statusCode}`);
  next();
};
const app = express();
/* middlewares */
app.use(printMethod);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: v4(),
  cookie: { maxAge: 50000 },
  saveUninitialized: false,
}));

/* routes */
routes(app);

/* listen to server */
app.listen(3000, (err) => {
  if (!err) {
    console.log('started server at port 3000');
  }
});
module.exports = app;
