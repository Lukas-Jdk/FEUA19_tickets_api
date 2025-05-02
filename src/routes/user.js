import express from "express";
import authUser from "../middleware/authUser.js";
import {
  REGISTER_USER,
  LOGIN_USER,
  GET_NEW_JWT_TOKEN,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  BUY_TICKET,
  GET_ALL_USERS_WITH_TICKETS,
  GET_USER_BY_ID_WITH_TICKETS
} from "../controllers/user.js";


const router = express.Router();

router.post("/auth/register", REGISTER_USER);
router.post("/auth/login", LOGIN_USER);
router.post("/auth/refreh-token", GET_NEW_JWT_TOKEN);

router.get("/users", authUser, GET_ALL_USERS);
router.get("/users/:id", authUser, GET_USER_BY_ID);

router.post("/buy-ticket", authUser, BUY_TICKET);
router.get("/users-with-tickets", authUser, GET_ALL_USERS_WITH_TICKETS);
router.get("/users/:id/tickets", authUser, GET_USER_BY_ID_WITH_TICKETS)

export default router;
