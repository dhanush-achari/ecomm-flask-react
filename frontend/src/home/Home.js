import React from 'react'
import ProductsContainer from '../products/ProductsContainer'
import Navbar from './Nav'
function Home() {
  return (
    <div>
        <Navbar/>
        <ProductsContainer/>
    </div>
  )
}

export default Home