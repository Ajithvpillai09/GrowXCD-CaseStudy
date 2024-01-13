import asyncHandler from "express-async-handler"

export const homeController = asyncHandler(async(req,res)=>{
    

    res.status(200).json({message:"users profileee"})
})