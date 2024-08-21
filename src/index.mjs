import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import getOrdersByEmail from "./routes/get-orders-by-email.mjs";
import { closePool } from "./db.mjs";

const app = express();

app.use(bodyParser.json());

app.use(cors());

// app.post("/get-orders-by-email",)
app.use("/get-orders-by-email", getOrdersByEmail);

const port = process.env.PORT || 8443;

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const gracefulShutdown = async () => {
  console.log("Shutting down gracefully...");
  await closePool();
  server.close(() => {
    console.log("Closed out remaining connections.");
    process.exit(0);
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
