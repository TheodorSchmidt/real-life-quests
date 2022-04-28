import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import 'firebase/database';
import { getDatabase, ref } from 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PID,
    storageBucket: process.env.REACT_APP_SB,
    messagingSenderId: process.env.REACT_APP_SID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MID
};

const app = initializeApp(config);
const database = getDatabase(app);
export const questsRef = ref(database, "quests");
export const charactersRef = ref(database, "characters");
export const locationsRef = ref(database, "locations");
export const restsRef = ref(database, "rests");
export const perksRef = ref(database, "perks");
export const notesRef = ref(database, "notes");