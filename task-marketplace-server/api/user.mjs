import express from "express";
import authenticate from "../middleware/authenticate.mjs";
import firebaseAdmin from "../services/firebase.mjs";
const { db } =  firebaseAdmin;
const router = express.Router();

router.get("/", authenticate, async function (request, response) {
    console.log(response.user);
    response.status(200).json(request.user);
});

router.post("/", async function (request, response) {
    const {email, name, password} = request.body;

    if (!email || !name || !password) {
        return response.status(400).json({
            error: "Invalid request body. Must contain email, password and name for user."
        });


    }
    try {
        const new_firebase_user = await firebaseAdmin.auth.createUser({
            email,
            password
        });

        if (new_firebase_user) {
            console.log("Inside if.");
            await db.collection("user").add({
                email,
                name,
                firebaseId: new_firebase_user.uid
            });
            console.log("After insert");
        }
        return response
            .status(200)
            .json({
                success: "Account created successfully. Please sign in."
            });

    } catch (error) {
        if (error.code === "auth/email-already-exists") {
            return response
                .status(400)
                .json({
                    error: "User account already exists at email address."
                });

        }
        return response.status(500).json({
            error: "Server error. Please try again."
        });
    }
});

export default router;
