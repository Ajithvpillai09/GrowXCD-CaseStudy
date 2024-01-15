import {axiosInstance } from "./axiosInstance"

export const getAllProducts = async ()=>{
    try {
    const products = await axiosInstance.get('/home');
    return products;
    } catch (error) {
        throw new Error("something went wrong")
    }
}

export const getProductDetail = async (id)=>{
    try {
        const {data} = await axiosInstance.get(`/product/${id}`)
        return data.productDetail
    } catch (error) {
        throw new Error("unable to get product")
    }
}

export const getCart = async ()=>{
    const cart = await axiosInstance.get('/cart')
    return cart
}

export const addToCart = async (productData)=>{
    try {
        const response = await axiosInstance.post('/add-to-cart', productData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("unable add to cart")
    }
}

export const updateQuantity = async ()=>{
    const data = await axiosInstance.patch('/update-quantity')
    return data

}

export const getCartCount = async ()=>{
    try {
        const {data} = await axiosInstance.get('/cart-count')
        return data
        
    } catch (error) {
        throw new Error("unable get cart count")
    }
}