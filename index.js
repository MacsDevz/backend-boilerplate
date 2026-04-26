//library
import express from "express";
import dotEnv from "dotenv";
import session from "express-session";
import mongoStore from "connect-mongo";

dotEnv.config();

//routes import
import connectDB from "./configs/db.js";
import userRoutes from "./routes/userRoutes.js";

const PORT = process.env.PORT || 4200;
const app = express();

//middleware
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

//database Connection
connectDB();

app.listen(PORT, () => {
  console.log(`server is Running http://localhost:${PORT}`);
});
