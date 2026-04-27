//library
import express from "express";
import dotEnv from "dotenv";
import session from "express-session";
import mongoStore from "connect-mongo";
import cors from "cors";
import helmet from "helmet";

//config limiter
import limiterConfig from "./configs/limiter.js";

dotEnv.config();

//routes import
import connectDB from "./configs/db.js";
import userRoutes from "./routes/userRoutes.js";
import router from "./routes/postRoutes.js";

const PORT = process.env.PORT || 4200;
const app = express();

//middleware
app.use(limiterConfig);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, //1hr
    },
    rolling: true,
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  }),
);

//routes
app.use("/api/auth", userRoutes);

app.use("/api/post", router);

//routes with sample API
app.get("/get-data", async (req, res) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const result = await response.json();

  res.send(result);
});

//database Connection
connectDB();

app.listen(PORT, () => {
  console.log(`server is Running http://localhost:${PORT}`);
});
