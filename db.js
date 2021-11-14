import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import config from "./config.js";

initializeApp(config.firebaseConfig);

const db = getFirestore();

export default db;
