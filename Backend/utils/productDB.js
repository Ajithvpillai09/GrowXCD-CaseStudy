import { db } from "./db.js";

export async function getAllProducts(){
    try {

        const products = await db.product.findMany({
            include:{
                freeProduct:true
            }
        })
        return products
      
    } catch (error) {
        throw new Error("Error in fetching products:",error)
    }
}

export async function getProductDetails(productId){
    try {
        const product = await db.product.findFirst({
            where:{
                id:productId
            },
            include:{
                freeProduct:true
            }
        })
        
        return product
      
    } catch (error) {
        throw new Error("Error in fetching product details:",error)
    }
}

export async function updateQuantity(id,count){
    try {
        await db.product.update({
            where:{
                id
            },
           data:{
            quantity:{
                increment:count
            }
           }
        })
    } catch (error) {
        throw new Error("Error in updating quantity:",error)
    }
}





