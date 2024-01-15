import { useParams ,useNavigate} from "react-router-dom"
import { useEffect,useState } from "react"
import { getProductDetail } from "../api/productsApi";

export default function ProductDetail(){

    const [product,setProduct]  = useState({});
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        async function productData(){
            try {
                const product = await getProductDetail(id)
                product ? setProduct(product) : navigate('/')
            } catch (error) {
                console.log(error);
            }
        }
        productData()
    })


    return(
       <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
         <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center">
                <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                    <img  src={`https://res.cloudinary.com/dcv6mx1nk/image/upload/${product?.imageUrl}`} className="max-w-[200px] lg:max-w-sm" />
                </div>
                <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto">Nike shoes</h1>
                    <div className="text-xl text-red-500 font-medium mb-6">
                        123333
                    </div> 
                    <p className="mb-8">sadjnjnfnenwf dkjnfnjwefi kjdwnjfnqwe knwqjf </p>
                    <button className="bg-black py-8 text-white">
                        Add to cart
                    </button>

                </div>

            </div>

         </div>

       </section>
    )
 }