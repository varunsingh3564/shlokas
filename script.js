//   ----------------------/Database Integration/-----------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyCigcWWzouNPXh76Md02J2kvmhgVbVdI-w",
  authDomain: "mini-project-varun.firebaseapp.com",
  databaseURL: "https://mini-project-varun-default-rtdb.firebaseio.com",
  projectId: "mini-project-varun",
  storageBucket: "mini-project-varun.firebasestorage.app",
  messagingSenderId: "396877698805",
  appId: "1:396877698805:web:1d32a7900207261e8697bc",
  measurementId: "G-SDXNGMWSMX"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//-------------------------------/Fetching Data/-------------------------------
function fetchTranslation(shlokaNum= window.currentShlokaNum || 1, languageKey) {
  const tranRef = ref(
    database,
    `Shloka-${shlokaNum}/Translations/${languageKey}`
  );
  get(tranRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        document.getElementById("shloka-box").innerHTML = snapshot.val();
      } else {
        console.log("No data found.");
      }
    })
    .catch((error) => {
      console.log("Error translating.", error);
    });
}
//----------------------/Database Integration End/-----------------------

window.changeText = function (languageKey) {
  fetchTranslation(window.currentShlokaNum, languageKey);
};


//-----------------------------/Onclick functions/-----------------------------
window.navClick = async function (shlokaNumber) {
  window.currentShlokaNum = shlokaNumber;
  const mainRef = ref(database, `Shloka-${shlokaNumber}/main`);
  const audioRef = ref(database, `Shloka-${shlokaNumber}/aud`);
  const snapshot = await get(audioRef);
  const snapshot1 = await get(mainRef);
  if (snapshot.exists()) {
    const audioUrl = snapshot.val();
    document.getElementById("audPlayer").src = audioUrl;
  } else {
    console.error("No audio data found.");
  }
  if (snapshot1.exists()) {
    const mainText = snapshot1.val();
    document.getElementById("shloka-box").innerHTML = mainText;
  } else {
    console.error("No text data found.");
  }
};