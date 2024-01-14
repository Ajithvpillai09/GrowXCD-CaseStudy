import asyncHandler from "express-async-handler"
import * as db from "../utils/productDB.js"

export const homeController = asyncHandler(async(req,res)=>{ 

    const products = await db.getAllProducts()
    res.status(200).json({products})
})

export const productDetails = asyncHandler(async(req,res)=>{
    
    const id = req.params.id
    const productDetail = await db.getProductDetails(id)
    res.status(200).json({productDetail})
})

