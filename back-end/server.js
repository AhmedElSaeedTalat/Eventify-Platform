import express from "express";
import session from "express-session";
import { v4 } from "uuid";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import cors from "cors";
import dbInstance from "./utils/db";
import routes from "./routes/index";
/* module to start the server */

let store;
const app = express();
const client = createClient({
  host: "localhost",
  port: 6379,
});

client.on("connect", () => {
  console.log("connected to redis");
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
  origin: 'http://localhost:3001',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.options('*', cors());
app.use(session({
  store,
  secret: v4(),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7200000,
    secure: false,
    httpOnly: true,
  },
}));
app.use(
  session({
    store,
    secret: v4(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7200000,
      secure: false,
      httpOnly: true,
    },
  })
);

/* swagger setup */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Eventify Api",
      version: "1.0.0",
      description: "Eventify platform api",
    },
    servers: [
      {
        url: "http://localhost:5001",
      },
    ],
  },
  apis: ["./routes/*.js", "./routes/*.yml"],
};
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/* routes */
routes(app);

/* listen to server */
app.listen(5001, (err) => {
  if (!err) {
    console.log("started server at port 5001");
  }
});
module.exports = app;
