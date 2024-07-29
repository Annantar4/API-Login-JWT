import { getUsers, createUsers, loginUsers, getOneUser } from "../controller/User.js";
import { auth } from "../middleware/auth.js";
import express from "express";

const router = express.Router();

router.get('/users', auth ,getUsers);
router.post('/users',createUsers);
router.post('/login',loginUsers);
router.get("/user", auth, getOneUser);

export default router;