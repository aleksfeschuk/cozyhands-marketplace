import type React from "react";
import { BrowserRouter as Router, Routes, Route }  from "react-router-dom";
import Header from "./components/Header";


const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<div> Home page (to be implemented)</div>} />
          <Route path="/shop" element={<div>Shop Page (to be implemented)</div>} />
          <Route path="/cart" element={<div>Cart Page (to be implemented)</div>} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
