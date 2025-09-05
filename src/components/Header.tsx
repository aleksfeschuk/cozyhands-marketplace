import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/hooks/useAuth';

const Header: React.FC = () => {
    // State to manage the mobile menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle state of the menu
    const toggleMenu = () => { 
        setIsMenuOpen((prev) => !prev);
    };

    const { user, loading, signInGoogle, signOutApp } = useAuth();

    const isAdmin = Boolean(
        user && ['aleksfeschuk@gmail.com'].includes(user.email ?? '')
    );


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

                <div className="header__right">

                    <nav
                        className={`header__nav ${isMenuOpen ? "header__nav--open" : "header__nav--closed"}`}
                        aria-label="Main navigation"
                    >
                        
                        
                            {/* Button closed for mobile menu */}
                        <button
                            className="header__nav-close"
                            onClick={toggleMenu}
                            aria-label="Close Menu"
                            type="button"
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
                                    onClick={() => setIsMenuOpen(false)}
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
                                    onClick={() => setIsMenuOpen(false)}
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
                                    onClick={() => setIsMenuOpen(false)}
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
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Cart
                                </NavLink>
                            </li>
                            {isAdmin && (
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
                            )}
                        </ul>
                    </nav>

                    <button 
                        className="header__menu-toggle"
                        onClick={toggleMenu}
                        aria-label="Open menu"
                        type="button"
                    >
                        <span className="material-icons">menu</span>
                    </button>
                    <div className="header__auth">
                        {loading ? (
                            <span className="header__user">...</span>
                        ) : user ? (
                                <>
                                    <span className="header__user">{user.email}</span>
                                    <button className="header__btn" onClick={signOutApp}>Sign Out</button>
                                </>
                            ) : (
                                <button className="header__btn" onClick={signInGoogle}>Sign In</button>
                            )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;