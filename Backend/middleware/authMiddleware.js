import jwt from "jsonwebtoken"
import asyncHandler from 'express-async-handler'
import {v4 as uuidv4} from "uuid"

export const authUser = asyncHandler(async(req,res,next)=>{
    let token;
    token = req?.cookies?.user ;
    if(token){
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded.userId
        next()
    }else{
        const userId = uuidv4()
        token = jwt.sign({userId},process.env.JWT_SECRET,
            {
                expiresIn:'30d'
            });
       
        res.cookie('user',token,
        {
            httpOnly:true,
            secure:process.env.NODE_ENV !== 'development',
            sameSite:'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
        req.user = userId;
        next ()

    }
})