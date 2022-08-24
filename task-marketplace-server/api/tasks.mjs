import express from "express";
import authenticate from "../middleware/authenticate.mjs";
import firebaseAdmin from "../services/firebase.mjs";
const { db } =  firebaseAdmin;
const router = express.Router();

router.get("/", authenticate, async function (request, response) {
    const tasks_ref = db.collection("tasks");
    const snapshot = await tasks_ref.get();
    let tasks = [];

    snapshot.forEach((task) => {

        tasks.push(Object.assign({},
            task.data(),
            { id: task.id }

        ));
    });

    response.status(200).json(tasks);
});

router.post("/", authenticate, async function (request, response) {
    console.log(response.user);
    const document = await db.collection("tasks").add({
        description: request.body.task
    })
    response.status(200).json(document);

});

router.put("/:id", authenticate, async function (request, response) {
    console.log("Request body", request.body);
    const task_ref = await db.collection("tasks").doc(request.params.id);
    const update = await task_ref.update(request.body);


    response.status(200).json(update);

});

export default router;
