import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json());

app.use(cors());

const port = process.env.PORT ?? 5555;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
