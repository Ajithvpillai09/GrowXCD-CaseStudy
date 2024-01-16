import { createContext, useState, useEffect } from 'react';
import { getCartCount } from '../api/productsApi';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [count, setCount] = useState(0);
  const [rerender,setRerender] = useState(false)

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const data = await getCartCount();
        setCount(data._count);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartCount();
  }, [rerender]); 

  const triggerRerender = () => {
    setRerender(prev => !prev);
  };

  return (
    <CartContext.Provider value={{ count,triggerRerender}}>
      {children}
    </CartContext.Provider>
  );
};

    