import { useState,useEffect } from "react"
import { getCart } from "../api/productsApi"
import { updateQuantity ,removeProduct} from "../api/productsApi"
import {toast} from 'react-toastify'

export default function Cart(){

    const [cart,setCart] = useState(null)
    const [disable,setDisable] = useState(false)
    
    useEffect(()=>{
        async function cartDetails(){
            try {
                const data = await getCart()
                console.log(data);
                setCart(data)
            } catch (error) {
                console.log(error);
            }
        }
        cartDetails()
    },[disable])

    async function quantityUpdate(productId,count,cartQuantity,productQuantity,discountPrice,offer){
       try {
          setDisable(true)
          const data = {
            productId,
            count,
            cartQuantity,
            productQuantity,
            discountPrice,
            offer
          }
          const rslt = await updateQuantity(data)
          toast.success(rslt)
       } catch (error) {
        toast.error(error.message)
       }finally{
        setDisable(false)
       }
    }

    async function productRemove(productId,productPrice,discountPrice,quantity){
        try {
            setDisable(true)
            const data={
                productId,
                productPrice,
                discountPrice,
                quantity
            }
            const rslt = await removeProduct(data)
            toast.success(rslt)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setDisable(false)
        }
    }

    return(
        <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <section className="py-11 px-4 mx-auto max-w-screen-xl lg:py-16">
            {
                 cart?.products.length
                ?
                (
             <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                {cart?.products?.map((doc)=>
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" key={doc?.item?.id}>
                <img src={`https://res.cloudinary.com/dcv6mx1nk/image/upload/${doc?.item?.imageUrl}`} alt="product-image" className="w-full rounded-lg sm:w-40" />
            
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div>
                    <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">{doc?.item?.name}</h2>
                        <p className="mt-1 text-xs text-gray-700"></p>
                  </div>
                  {doc?.item?.freeProduct && 
                      <div className='flex flex-row h-24 gap-2 justify-center items-center'>
                      <p className='text-gray-700'>
                          {doc?.quantity} 
                          <span className="text-2xl ml-1 ">
                          x
                          </span>
                      </p>
                      <img src={`https://res.cloudinary.com/dcv6mx1nk/image/upload/${doc?.item?.freeProduct?.imageUrl}`} alt="" className='w-12 h-12 rounded-md cursor-pointer' />
                      
                 </div>
                  }
                 
                </div>
              <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center border-gray-100">
                <button className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                 disabled={disable}
                 onClick={()=>{
                    quantityUpdate(
                        doc?.item?.id,
                        -1,
                        doc?.quantity,
                        doc?.item?.quantity,
                        doc?.item?.discountPrice,
                        doc?.item?.offer
                    )
                 }} 
                > - </button>
                  <p className="h-8 w-8 border bg-white text-center text-xs flex justify-center items-center">{doc?.quantity}</p>
                <button className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                disabled={disable}
                onClick={()=>{
                    quantityUpdate(
                        doc?.item?.id,
                        1,
                        doc?.quantity,
                        doc?.item?.quantity,
                        doc?.item?.discountPrice,
                        doc?.item?.offer
                    )
                 }} 
                > + </button>
                </div>
                <div className="flex items-center space-x-4">

                  <p className="text-sm">₹ {doc?.discountPrice}</p>
                  <button
                  disabled={disable}
                  onClick={()=>{
                    productRemove(
                        doc?.item?.id,
                        doc?.item?.discountPrice,
                        doc?.discountPrice,
                        doc?.item?.quantity,
                    )
                  }}
                  >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
            )}
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Total Discount</p>
              <p className="text-gray-700">₹ {cart?.discount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Total Price</p>
              <p className="text-gray-700">₹ {cart?.totalPrice}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">₹ {cart?.totalPrice}</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-black py-1.5 font-medium text-blue-50 hover:bg-black">Check out</button>
          </div>
        </div>
                )
                :

        <h2 className="text-center text-gray-900 dark:text-white text-xl md:text-4xl font-extrabold mb-2">
         YOUR CART IS EMPTY
        </h2>

            }
        
        </section>
      </div>
    )
 }



