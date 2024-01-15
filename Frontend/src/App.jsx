import { Routes, Route} from 'react-router-dom'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'


function App() {

  return (
    <Routes>
        <Route path='/'element={<Products/>} />
        <Route path='/product/:id' element={<ProductDetail/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App