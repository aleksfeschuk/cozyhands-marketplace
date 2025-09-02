import type React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate }  from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Shop from "./components/Shop";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Confirmation from "./components/Confirmation";
import AllProducts from "./components/AllProducts";
import Clothing from "./components/Clothing";
import Candles from "./components/Candles";
import Accessories from "./components/Accessories";
import Bags from "./components/Bags";
import Sale from "./components/Sale";
import Blog from "./components/Blog";
import RequireAdmin from "./components/RequireAdmin";
import AdminProducts from "./components/admin/AdminProducts";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" 
            element={
                    <RequireAdmin>
                      <AdminProducts />
                    </RequireAdmin>} 
            />
          <Route path="/shop" element={<Shop />} >
            <Route  index element={<Navigate to="all-products" replace />}/>
            <Route path="all-products" element={<AllProducts />}/>
            <Route path="clothing" element={<Clothing />} />
            <Route path="candles" element={<Candles/>}></Route>
            <Route path="accessories" element={<Accessories/>}></Route>
            <Route path="bags" element={<Bags/>}></Route>
            <Route path="sale" element={<Sale/>}></Route>
          </Route>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="blog" element={<Blog />}></Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/confirmation" element={<Confirmation />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  )
}

export default App;
