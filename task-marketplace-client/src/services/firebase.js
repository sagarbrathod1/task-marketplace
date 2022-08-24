import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
var config = require('./config.js');

const firebase_config = {
    apiKey: config.apikey,
    authDomain: "task-marketplace.firebaseapp.com",
    projectId: "task-marketplace",
    storageBucket: "task-marketplace.appspot.com",
    messagingSenderId: "878010222407",
    appId: "1:878010222407:web:2412211292821fd64fae62",
    measurementId: "G-ERTTP1LZZ2"
};

initializeApp(firebase_config);

const auth = getAuth();

console.log(auth);

export default {
    auth
};
