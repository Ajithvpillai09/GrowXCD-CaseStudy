import express from "express";
import { authUser } from "../middleware/authMiddleware.js";
import * as controllers from "../controllers/userController.js";


const router = express.Router()



router.get('/home',authUser,controllers.homeController);
router.get('/product/:id',controllers.productDetails)


export default router;