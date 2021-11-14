import db from "../db.js";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import Game from "../models/Game.js";

const addGame = async (req, res) => {
  try {
    const data = req.body;
    await addDoc(collection(db, "games"), data);
    res.send("Game successfuly added");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllGames = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "games"));
    if (querySnapshot.empty) {
      return res.status(404).send("No games found");
    }
    const games = [];
    querySnapshot.forEach((doc) => {
      games.push(
        new Game(
          doc.id,
          doc.data().name,
          doc.data().publisher,
          doc.data().release,
          doc.data().genres
        )
      );
    });
    res.send(games);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    const documentSnapshot = await getDoc(doc(db, "games", gameId));
    if (!documentSnapshot.exists()) {
      return res.status(404).send("No game found");
    }
    const game = new Game(
      documentSnapshot.id,
      documentSnapshot.data().name,
      documentSnapshot.data().publisher,
      documentSnapshot.data().release,
      documentSnapshot.data().genres
    );
    res.send(game);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateGame = async (req, res) => {
  try {
    const documentReference = await doc(db, "games", req.params.id);
    const documentSnapshot = await getDoc(documentReference);
    if (!documentSnapshot.exists()) {
      return res.status(404).send("No game found");
    }
    const data = req.body;
    await setDoc(documentReference, data);
    res.send("Game successfuly updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    const documentReference = await doc(db, "games", gameId);
    const documentSnapshot = await getDoc(documentReference);
    if (!documentSnapshot.exists()) {
      return res.status(404).send("No game found");
    }
    await deleteDoc(documentReference);
    res.send("Game successfuly deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export { addGame, getAllGames, getGame, updateGame, deleteGame };
