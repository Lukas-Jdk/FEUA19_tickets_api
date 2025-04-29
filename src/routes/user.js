import express from "express";
import {
  REGISTER_USER,
  LOGIN_USER,
  GET_NEW_JWT_TOKEN,
  GET_ALL_USERS,
  GET_USER_BY_ID,
} from "../controllers/user.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.post("/auth/register", REGISTER_USER);
router.post("/auth/login", LOGIN_USER);
router.post("/auth/refreh-token", GET_NEW_JWT_TOKEN);

router.get("/users", authUser, GET_ALL_USERS);
router.get("/users/:id", authUser, GET_USER_BY_ID);

export default router;
