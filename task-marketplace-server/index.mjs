import express, {json} from "express";
import cors from "cors";

import config from "./config/index.mjs";
import user_router from "./api/user.mjs";
import tasks_router from "./api/tasks.mjs";
const {port} = config;

const app = express();

app.use(cors({origin: true}));
app.use(json());
app.use("/api/user", user_router);
app.use("/api/tasks", tasks_router);

app.listen(port, () =>
    console.log(`App listening on PORT ${port}`)
);
