import { db } from "./db.js";

export async function getCart(id){
    try { 
        const cart = await db.cart.findUnique({
            where: {
                id,
              },
              include: {
                products: {
                  select: {
                    discountPrice: true,
                    quantity: true,
                    createdAt: true,
                    updatedAt: true,
                    item: {
                      include: {
                        freeProduct: true,
                      },
                    },
                  },
                },
              },
          });
        return cart
        
    } catch (error) {
        console.log(error);
        throw new Error("Error in fetching  cart:",error)
    }
}

export async function getProductInCart(cartId,itemId){
    try {
        const cartProduct = await db.productInCart.findUnique({
            where:{
                cartId,
                itemId
            }
        })
        return cartProduct;
    } catch (error) {
        throw new Error("Error in getting product in cart  cart:",error)
    }
}


export async function addToCart(id,productId,discount,discountPrice){
    try {

        await db.cart.upsert({
            where:{
                id
            },
            update:{
                discount:{
                    increment:discount
                },
                totalPrice:{
                    increment:discountPrice
                },
            },
            create:{
                id,
                discount,
                totalPrice:discountPrice,
                products:{
                    create:{
                        itemId:productId,
                        discountPrice,
                        quantity:1
                    }
                }
            }
        })
        
    } catch (error) {
        throw new Error("Error in adding to cart:",error)
    }
}

export async function updateProductInCart(id,productId,discountPrice,count){
    try {

       await db.productInCart.upsert({
        where:{
            itemId:productId,
        },
        update:{
             quantity:{
                increment:count, 
             },
             discountPrice:{
                increment:discountPrice
             }
        },
        create:{
            cartId: id,   
            itemId: productId,
            discountPrice: discountPrice,
            quantity: 1,
        }
       })
        
    } catch (error) {
        console.log(error);
        throw new Error("Error in updating to cart:",error)
    }
}

export async function removeProduct(id,itemId,discount,totalPrice){
  try {
      
    await db.cart.update({
        where:{
            id
        },
        data:{
            discount:{
                decrement:{
                   discount
                }
            },
            totalPrice:{
                decrement:{
                  totalPrice
                }
            },
            products:{
                delete:{itemId}
            }
        }
    })

  } catch (error) {
    
  }
}