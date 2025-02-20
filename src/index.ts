import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import error from "./controllers/error/error";
//For env File
dotenv.config({ path: "./.env" });
//main express app
const app: Application = express();

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//on unhandled uncaughtExceptions
process.on("uncaughtException", (err) => {
  console.log("Uncaught exception", err);
  process.exit(1);
});
if (process.env.DB_PASSWORD && process.env.DB_URL)
  mongoose
    .connect(process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD))
    .then(() => console.log("Connected to database"));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
const port = process.env.PORT ?? 8000;
const server = app.listen(port, () => {
  console.log(`Server is Fire at https://localhost:${port}`);
});
//error handler
app.use(error);
//on unhandledRedjections
process.on("unhandledRejection", (err) => {
  console.log("Error 🔥🔥", err);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  server.close(() => {
    process.exit(1);
  });
});
export default app;
