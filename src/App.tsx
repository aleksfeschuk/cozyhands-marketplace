import type React from "react";
import { BrowserRouter as Router, Routes, Route }  from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Shop from "./components/Shop";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Confirmation from "./components/Confirmation";
import AllProducts from "./components/AllProducts";
import Clothing from "./components/Clothing";
import Candles from "./components/Candles";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} >
            <Route path="all-products" element={<AllProducts />}/>
            <Route path="clothing" element={<Clothing />} />
            <Route path="candles" element={<Candles/>}></Route>
          </Route>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/confirmation" element={<Confirmation />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  )
}

export default App;
