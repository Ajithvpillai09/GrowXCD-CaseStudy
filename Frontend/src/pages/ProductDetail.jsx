import { useParams ,useNavigate} from "react-router-dom"
import { useEffect,useState } from "react"
import { getProductDetail ,addToCart  } from "../api/productsApi";
import { ClipLoader } from "react-spinners";
import {toast} from "react-toastify"

export default function ProductDetail(){

    const [product,setProduct]  = useState({});
    const [disable,setDisable] = useState(false)


    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        async function productData(){
            try {
                const product = await getProductDetail(id)
                product ? setProduct(product) : navigate('/')
            } catch (error) {
                navigate('/')
            }
        }
        productData()
    },[])

    async function cartUpdate(){
        try {
            setDisable(true)
            await addToCart({productId:id})
            toast.success("product added to cart")
        } catch (error) {
            console.log(error);
        }finally{
            setDisable(false)
        }
    }


    return(
        <section className="py-11 px-4 mx-auto max-w-screen-xl lg:py-16">
            <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
            <div className='flex flex-col gap-6 lg:w-2/4'>
                <img src={`https://res.cloudinary.com/dcv6mx1nk/image/upload/${product?.imageUrl}`} alt="" className='w-full h-full aspect-square object-cover object-center rounded-xl'/>
                
            </div>
            <div className='flex flex-col gap-4 lg:w-2/4'>
            <div>
                <span className="mr-2 rounded-full bg-black px-1 text-center text-sm font-medium text-white">{product?.offer}% OFF</span>
                <h1 className='text-3xl font-bold'>{product?.name}</h1>
            </div>
                <p className='text-gray-700'>
                {product.description}
                </p>
                <div className="flex">
                <p className="mt-1  mx-2 text-sm text-gray-500 line-through ">₹{product?.price}</p>
                <h6 className='text-2xl font-semibold'>₹{product?.discountPrice}</h6>
                </div>
                {product?.freeProduct &&
                <div className='flex flex-row h-24 gap-2'>
                <img src={`https://res.cloudinary.com/dcv6mx1nk/image/upload/${product?.freeProduct?.imageUrl}`} alt="" className='w-24 h-24 rounded-md cursor-pointer' />
                   <p className='text-gray-700'>
                     Free {product?.freeProduct?.name} worth 
                     <span className="text-2xl ml-1 font-semibold">
                      ₹ {product?.freeProduct?.price}
                     </span>
                   </p>
               </div>
                }
                <div className='flex flex-row items-center gap-12'>
                    <button className= "bg-black text-white font-semibold py-3 px-16 rounded-xl h-full" 
                        onClick={cartUpdate}
                        disabled={disable}
                    >
                        {disable ?
                         <ClipLoader color="white" size={25}/>
                         :
                         "Add to Cart"
                        }
                    </button>
                </div>
             </div>
            </div>
        </section>
    )
 }