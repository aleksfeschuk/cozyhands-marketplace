import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import '../styles/Shop.scss';



const Shop: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <section className="shop">
            <div className="container shop__container">
                <h1 className="shop__title">Our Handcrafted Collection</h1>
        
                <div className="shop__layout">
                    <aside className="shop__panel">
                        <h3 className="shop__panel-title">Browse</h3>
                        <nav className={`shop__nav ${isMenuOpen ? "shop__nav--open" : ""}`}>
                                 <nav className="shop__nav shop__nav--static">
                            <ul className="shop__nav-list">
                                <li className="shop__nav-item">
                                    <NavLink
                                        to="/shop/all-products"
                                        className={({ isActive }) => 
                                            `shop__nav-link ${isActive ? "shop__nav-link--active" : ""}`
                                        }
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            All Products
                                    </NavLink>
                                </li>
                                <li className="shop__nav-item">
                                    <NavLink
                                        to="/shop/candles"
                                        className={({ isActive }) =>
                                        `shop__nav-link ${isActive ? "shop__nav-link--active" : ""}`
                                        }
                                    >
                                        Candles
                                    </NavLink>
                                </li>
                                <li className="shop__nav-item">
                                    <NavLink
                                        to="/shop/clothing"
                                        className={({ isActive }) => 
                                            `shop__nav-link ${isActive ? "shop__nav-link--active" : ""}`
                                        }
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Clothing
                                    </NavLink>
                                </li>
                                <li className="shop__nav-item">
                                    <NavLink
                                        to="/shop/accessories"
                                        className={({ isActive }) => 
                                            `shop__nav-link ${isActive ? "shop__nav-link--active" : ""}`
                                        }
                                            onClick={() => setIsMenuOpen(false)}
                                    >
                                        Accessories
                                    </NavLink>
                                </li>
                                <li className="shop__nav-item">
                                    <NavLink
                                        to="/shop/bags"
                                        className={({ isActive }) => 
                                            `shop__nav-link ${isActive ? "shop__nav-link--active" : ""}`
                                        } 
                                            onClick={() => setIsMenuOpen(false)}
                                    >
                                        Bags
                                    </NavLink>
                                </li>
                                <li className="shop__nav-item">
                                    <NavLink
                                        to="/shop/sale"
                                        className={({ isActive }) => 
                                            `shop__nav-link ${isActive ? "shop__nav-link--active" : ""}`
                                        }
                                            onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sale
                                    </NavLink>
                                </li>
                            </ul>
                            </nav>      
                        </nav>
                       
                    </aside>
                    <Outlet/>
                </div>
                
                
            </div>
        </section>
    );
};

export default Shop;