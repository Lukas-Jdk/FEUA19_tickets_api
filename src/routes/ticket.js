import express from "express";
import authUser from "../middleware/authUser.js";
import {INSERT_TICKET} from "../controllers/ticket.js";

const router = express.Router();

router.post("/insert-ticket",authUser, INSERT_TICKET);

export default router;