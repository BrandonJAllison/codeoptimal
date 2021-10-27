import express from "express";

const router = express.Router();
//import middleware
import { requireSignin } from "../middleware";

// controllers
import { makeInstructor } from "../controllers/instructor";


router.post('/make-intructor', requireSignin, makeInstructor)

module.exports = router;