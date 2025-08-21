import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import '../styles/Shop.scss';



const Shop: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <section className="shop">
            <div className="container shop__container">
                <h2 className="shop__title">Our Handcrafted Collection</h2>
                <button
                    className="shop__menu-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? "Close menu" : "Open menu"}
                </button>
                <nav className={`shop__nav ${isMenuOpen ? "shop__nav--open" : ""}`}>
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
                                to="/shop/candles"
                                className={({ isActive }) => 
                                    `shop__nav-link ${isActive ? "shop__nav-link--active" : ""}` 
                                }
                                    onClick={() => setIsMenuOpen(false)}
                            >
                                Candles
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
                                    `shop__nav-link ${isActive ? "shop__nav-link-active" : ""}`
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
                                    `shop__nav-link ${isActive ? "shop__nav-link-active" : ""}`
                                }
                                    onClick={() => setIsMenuOpen(false)}
                            >
                                Sale
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </section>
    );
};

export default Shop;