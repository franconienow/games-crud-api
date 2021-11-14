import express from "express";
import cors from "cors";
import config from "./config.js";
import gameRoutes from "./routes/game.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", gameRoutes.routes);

app.listen(config.port, () =>
  console.log(`App is runing on ${config.url}`)
);
