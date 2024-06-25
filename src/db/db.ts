import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyBemGlQAmx39gllMhAVlbmuzcvSblwoFOI",
  authDomain: "free-games-dfdea.firebaseapp.com",
  projectId: "free-games-dfdea",
  storageBucket: "free-games-dfdea.appspot.com",
  messagingSenderId: "252283374942",
  appId: "1:252283374942:web:94ab82b738dac7806f53cf"
};


const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);


