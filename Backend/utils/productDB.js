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
           console.log(productId,"product id");
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



