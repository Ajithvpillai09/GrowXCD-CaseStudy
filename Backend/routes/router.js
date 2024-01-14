import express from "express";
import { authUser } from "../middleware/authMiddleware.js";
import * as controllers from "../controllers/userController.js";


const router = express.Router()



router.get('/home',authUser,controllers.homeController);
router.get('/product/:id',controllers.productDetails);
router.post('/add-to-cart',authUser,controllers.addToCart)
router.get('/cart',authUser,controllers.getCart)
router.patch('/update-quantity',authUser,controllers.updateQuantity)
router.patch('/delete',authUser,controllers.removeProduct)


export default router;