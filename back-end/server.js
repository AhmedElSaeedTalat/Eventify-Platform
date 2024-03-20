import express from 'express';
import session from 'express-session';
import { v4 } from 'uuid';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import cors from 'cors';
import dbInstance from './utils/db';
import routes from './routes/index';
/* module to start the server */

let store;
const app = express();
const client = createClient({
  host: 'localhost', // Change this to your Redis server host
  port: 6379,
});

client.on('connect', () => {
  console.log('connected');
  store = new RedisStore({ client });
});
const printMethod = (req, res, next) => {
  console.log(`${req.method}: ${req.url}, status code: ${res.statusCode}`);
  next();
};

/* middlewares */
app.use(printMethod);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3001'],
}));
app.use(session({
  store,
  secret: v4(),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 100000,
    secure: false,
    httpOnly: true,
  },
}));

/* routes */
routes(app);

/* listen to server */
app.listen(5001, (err) => {
  if (!err) {
    console.log('started server at port 5001');
  }
});
module.exports = app;
