import express from "express";
import {
  REGISTER_USER,
  LOGIN_USER,
  GET_NEW_JWT_TOKEN,
} from"../controllers/user.js"

const router = express.Router();


router.post("/auth/register",REGISTER_USER);

router.post("/auth/login",LOGIN_USER);

router.post("/auth/refreh-token", GET_NEW_JWT_TOKEN);



export default router;