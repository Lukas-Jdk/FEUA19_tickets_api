import express from "express";
import {
  REGISTER_USER,
  LOGIN_USER,
} from"../controllers/user.js"

const router = express.Router();


router.post("/auth/register",REGISTER_USER);

router.post("/auth/login",LOGIN_USER);






export default router;