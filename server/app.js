import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { jwt } from "@hono/hono/jwt";
import { logger } from "@hono/hono/logger";
//import { decode, sign, verify } from '@hono/hono/jwt'
import * as authController from "./controllers/authController.js"
import * as contentController from "./controllers/cotnentController.js"
import {adminCheck} from "./middlewares/middlewares.js"
const app = new Hono()


app.use("/*", cors());
app.use("/*", logger());
app.use("/api/content/*", jwt({secret: 'thaakol', }));
app.use("/api/content/manage/*", adminCheck);
app.get("/", (c) => c.json({ message: "Hello world!" }));

app.get("/api/content/admin", authController.becomeAdmin);
app.post("/api/auth/register", authController.registerUser);
app.post("/api/auth/login", authController.loginUser);
app.get("/api/content/check", authController.checkUser);


app.post("/api/content/manage/addTopic", contentController.addTopic);
app.get("/api/content/getTopics", contentController.getTopics);
app.get("/api/content/getQuestions/:topicId", contentController.getQuestions);
app.delete("/api/content/manage/delete/topic/:topicId", contentController.deleteTopic);
app.delete("/api/content/manage/delete/:topicId/question/:qId", contentController.deleteQuestion);


app.post("/api/content/manage/:topicId/addQuestion", contentController.addQuestion);
app.post("/api/content/manage/updateQuestion", contentController.updateQuestion);
app.post("/api/content/manage/updateOption", contentController.updateOption);
app.post("/api/content/manage/addOption", contentController.addOption);

app.delete("/api/content/manage/delete/option/:oId", contentController.deleteOption);

app.post("/api/content/answer/:topicId", contentController.logAnswer);





export default app;