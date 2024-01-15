import { useEffect,useState } from "react"
import { getAllProducts } from "../api/productsApi"
import { Link } from "react-router-dom"
import Header from "../components/Header"

export default function Products(){

    const [products,setProducts] = useState([])

    useEffect(()=>{
       async function fetchAllProducts(){
          const {data} = await getAllProducts();
          console.log(data.products);
          setProducts(data.products)
       }
       fetchAllProducts()
    },[])


   return(
    <>
    <section className="bg-[#f1f5f9]">
     
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
      <div className=" flex flex-col justify-evenly  p-8 md:p-12 mb-8">
        {/* <h2 className="text-center text-gray-900 dark:text-white text-xl md:text-4xl font-extrabold mb-2">
         THIS SEASON&#039;sS FRESH FITS
        </h2> */}
        <div className="grid lg:grid-cols-3 justify-items-center ">
          {
              products && products?.map((doc)=>{
                  return (
                      <Link to={`/product/${doc?.id}`} key={doc?.id}>
                      <div className="relative py-5 px-2 max-h-[40rem] rounded hover:shadow-lg lg:aspect-none group-hover:opacity-75" >
                        {doc?.offer > 0
                        &&
                        <span className="absolute top-2 left-2 m-2 rounded-full bg-black px-1  text-center text-sm font-medium text-white">{doc?.offer}% OFF</span>
                  }
                      <div className="overflow-hidden aspect-h-1 aspect-w-1 w-full lg:h-80">
                        <img src={`https://res.cloudinary.com/dcv6mx1nk/image/upload/${doc?.imageUrl}`}alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                      </div>
                      <div className="mt-4 flex justify-center">
                         <h3 className="text-sm text-gray-700">
                             {doc?.name}
                         </h3>
                      </div>
                      <div className="flex justify-evenly">
                      <p className="mt-1 text-sm text-gray-500 line-through ">₹{doc?.price}</p>
                      <p className="mt-1 text-sm font-medium text-gray-900 ">₹{doc?.discountPrice}</p>
                      </div>
                    </div>
                    </Link>
                  )
              })
          }
          </div>
        </div>
      </div>
    </section>
    </>
   )
}