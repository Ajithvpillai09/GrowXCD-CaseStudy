import express from "express";
import { authUser } from "../middleware/authMiddleware.js";
import { homeController } from "../controllers/userController.js";


const router = express.Router()



router.get('/home',authUser,homeController);


export default router;