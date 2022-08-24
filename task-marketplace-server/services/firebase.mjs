import admin from "firebase-admin";

import service_account from "../firebase-secrets.json" assert {type: "json"};

const firebase = admin.initializeApp({
    credential: admin.credential.cert(service_account)
});
const db = admin.firestore();

export default {
    auth: firebase.auth(),
    db
};
