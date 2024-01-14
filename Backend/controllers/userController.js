import asyncHandler from "express-async-handler"
import * as productDB from "../utils/productDB.js"
import * as cartDB from "../utils/cartDB.js"

export const homeController = asyncHandler(async(req,res)=>{ 

    const products = await productDB.getAllProducts()
    res.status(200).json({products})
})

export const productDetails = asyncHandler(async(req,res)=>{
    
    const id = req.params.id
    const productDetail = await productDB.getProductDetails(id)
    res.status(200).json({productDetail})
})


export const addToCart = asyncHandler(async(req,res)=>{

    const id = req.user;
    const {productId} = req.body

    const [product,cart,productInCart] = 
      await Promise.all(
        [
            productDB.getProductDetails(productId),
            cartDB.getCart(id),
            cartDB.getProductInCart(id,productId)
        ])

    if(productInCart?.quantity -1 >= product.quantity || product.quantity === 0){
        res.status(400)
        throw new Error('Maximum limit reached')
    }

    const discountPrice = product.offer > 0 
    ? Math.round(product.discountPrice - ((product.discountPrice * product.offer)/100))
    : product.discountPrice

    const discount = product.discountPrice - discountPrice

    await cartDB.addToCart(id,productId,discount,discountPrice)
    await productDB.updateQuantity(productId,-1)

    if(cart){
        await cartDB.updateProductInCart(id,productId,discountPrice,1)
    }

    res.status(201).json({"message":"added to cart"})

})

export const getCart = asyncHandler(async(req,res)=>{

     const id = req.user;
     const cart = await cartDB.getCart(id)

     res.status(200).json({cart})

})


export const updateQuantity = asyncHandler(async(req,res)=>{

    const cartId = req.user
    console.log(req.body);
    let {productId,count,cartQuantity,productQuantity,discountPrice,offer} = req.body;
    count = parseInt(count);
    cartQuantity = parseInt(cartQuantity)
    productQuantity = parseInt(productQuantity)
    discountPrice = parseInt(discountPrice)
    offer = parseInt(offer)


    if(productQuantity === 0 && count === 1){
        res.status(400)
        throw new Error('Maximum limit reached')
    }
    if(count === -1 && cartQuantity === 1){
        res.status(400)
        throw new Error('Minimum limit reached')
    }

    const discount = offer > 0 
    ? Math.round(discountPrice - ((discountPrice * offer)/100))
    : discountPrice
    
     let productCount = count === 1 ? -1 : 1
     console.log(productCount);
    await Promise.all([
        cartDB.updateProductInCart(cartId,productId,discount,count),
        productDB.updateQuantity(productId,productCount)
    ])
   
    res.status(200).json({message:"quantity updated successfully"})
})

export const removeProduct = asyncHandler(async(req,res)=>{

    const {productId,discount,totalPrice,quantity} = req.body
    const id = req.user;

    await Promise.all([
        cartDB.removeProduct(id,productId,discount,totalPrice),
        productDB.updateQuantity(productId,quantity)
    ])

    console.log(req.body);

    res.status(200).json({message:"product removed successfully"})


})






