import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    // State to manage the mobile menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle state of the menu
    const toggleMenu = () => { 
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <header className='header'>
            <div className="container header__container">
                <Link to="/" className="header__logo">
                    <img
                        src="/assets/logo-cozyhands.svg"
                        alt="CozyHands Logo"
                        width="120"
                        height="24"
                    />
                </Link>

                
                <nav
                    className={`header__nav ${
                        isMenuOpen ? "header__nav--open" : "header__nav--closed"
                    }`}
                >
                    
                    
                        {/* Button closed for mobile menu */}
                    <button
                        className="header__nav-close"
                        onClick={toggleMenu}
                        aria-label="Close Menu"
                    >
                        <span className="material-icons">close</span>
                    </button>
                    <ul className="header__nav-list">
                        <li>
                            <NavLink 
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "header__nav-link header__nav-link--active"
                                        : "header__nav-link"
                                }
                                end 
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/shop"
                                className={({ isActive }) => 
                                    isActive
                                        ? "header__nav-link header__nav-link--active"
                                        : "header__nav-link"
                                }
                            >
                                Shop
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/cart"
                                className={({ isActive }) =>
                                    isActive
                                        ? "header__nav-link header__nav-link--active"
                                        : "header__nav-link"
                                }
                            >
                                Cart
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <button 
                    className="header__menu-toggle"
                    onClick={toggleMenu}
                    aria-label="Open menu"
                >
                    <span className="material-icons">menu</span>
                </button>
            </div>
        </header>
    );
};

export default Header;