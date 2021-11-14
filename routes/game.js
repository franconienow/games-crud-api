import express from "express";
import {
  addGame,
  getAllGames,
  getGame,
  updateGame,
  deleteGame,
} from "../controllers/game.js";

const router = express.Router();

router.post("/game", addGame);
router.get("/games", getAllGames);
router.get("/game/:id", getGame);
router.post("/game/:id", updateGame);
router.delete("/game/:id", deleteGame);

export default {
  routes: router,
};
