import express from "express";
import db from "./config/database.js";
import router from "./routes/route.js";
const app = express();

try {
    await db.authenticate();
    console.log("Success");
} catch (error) {
    console.error(error);
}


app.use(express.json());
app.use(router);
app.listen(5000, ()=> {
    console.log("Server Running");
})