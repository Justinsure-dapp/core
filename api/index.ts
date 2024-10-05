import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import indexRouter from "./routes/_index";
import executor from "./executor";

const PORT = Number(process.env.PORT) || 9000;

const app = express();

app.use(cors({origin: "*"}));
app.use(express.json());
app.use(express.urlencoded());

app.use("*", (req, res, next) => {
  console.log(req.baseUrl);
  next();
});

app.use("/", indexRouter);

setInterval(() => {
  try {
    executor.safeCheckAndExecute();
  } catch (err) {
    console.error(err);
  }
}, 1000);

async function main() {
  if (!process.env.MONGODB_URI) throw new Error("Connection URI missing");
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
}

main();
