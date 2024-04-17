import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBFJaBbTVO7LuPfnYbFM5XE5F3qFTXgUE4",
  authDomain: "projetogames-7b088.firebaseapp.com",
  projectId: "projetogames-7b088",
  storageBucket: "projetogames-7b088.appspot.com",
  messagingSenderId: "768554019511",
  appId: "1:768554019511:web:e73d6a8d92e6bf8047bb32",
  databaseURL: "https://projetogames-7b088-default-rtdb.firebaseio.com/",

};


const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);


