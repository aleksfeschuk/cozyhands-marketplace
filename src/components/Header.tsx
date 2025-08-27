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
                <Link to="/" className="header__logo" aria-label="CozyHands home">
                    <img
                        src="/images/logo-cozyhands.svg"
                        alt='CozyHands'
                        width="120"
                        height="30"
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
                        <li className="header__nav-item">
                            <NavLink
                                to="/blog"
                                className={({ isActive}) =>
                                    `header__nav-link ${isActive ? "header__nav-link--active" : ""} `
                                }
                            > 
                                Blog
                            </NavLink>
                        </li>
                        <li className="header__nav-item">
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
                        <li className="header__nav-item">
                            <NavLink
                                to="/admin"
                                className={({ isActive }) =>
                                    `header__nav-link ${isActive ? "header__nav-link--active" : ""}`}
                                    onClick={() => setIsMenuOpen(false)}
                            >
                                Admin
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