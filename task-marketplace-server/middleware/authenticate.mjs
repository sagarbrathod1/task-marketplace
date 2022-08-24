import firebaseAdmin from "../services/firebase.mjs";
const { db } = firebaseAdmin;
export default async function (request, response, next) {

    try {
        const firebase_token = request.headers.authorization?.split(" ")[1];
        console.log(firebase_token)
        let firebase_user;
        if (firebase_token) {
            firebase_user = await firebaseAdmin.auth.verifyIdToken(firebase_token);
            console.log("fu ", firebase_user);

        }
        if (!firebase_user) {
            console.log("none");
            return response.sendStatus(401);
        }

        console.log("fu2 ", firebase_user.user_id)

        let user_ref = db.collection("user").where(
            "firebaseId", "==", firebase_user.user_id
        );

        console.log("ur", user_ref);

        let user = await user_ref.get();

        console.log("user ", user.empty);
        if (user.empty) {
            console.log("empty");
            return response.sendStatus(401);
        }
        let data = [];
        user.forEach((u) => (data.push(u.data())));
        
        console.log("usr ", data);


        request.user = data[0];

        next();
    } catch (err) {

        console.log(err);

        response.sendStatus(401);
    }

}
