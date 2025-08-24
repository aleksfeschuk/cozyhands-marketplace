import React from "react";
import { Link } from "react-router-dom";
import { mockProducts } from "../data/products";

const categories = [
    { name: "Clothing", path: "/shop/clothing" },
    { name: "Candles", path: "/shop/candles"},
    { name: "Accessories", path: "/shop/accessories"},
    { name: "Bags", path: "/shop/bags"},
    { name: "Sale", path: "/shop/sale"},
];

const promos = [
    { title: "Autumn Cozy Sale", text: "Up to 20% off", to: "/shop/sale"},
    { title: "New Arrivals", text: "Fresh handmade picks", to: "/shop/all-products"},
];

const featured = mockProducts.slice(0, 4);

// Home component for the main page
const Home: React.FC = () => {
    return (
        <section className="home">
            <div className="container home__content">
                <div className="home__hero">
                    <h1 className="home__title">
                        Welcome to CozyHands Marketplace
                    </h1>
                    <p className="home__subtitle">Discover handcrafted treasures made with love.</p>
                </div>
                
                {/* // Call to action button to shop now */}
                <div className="home__cta">
                    <Link to="/shop" className="home__cta-btn">
                        Shop Now
                    </Link>
                </div>

                {/* Product Categories Section*/}
                <section className="home__categories">
                    <h2 className="home__categories-title">Our Product Categories</h2>
                    <div className="home__categories-grid">
                        {categories.map((category) => (
                            <Link
                                key={category.name}
                                to={category.path}
                                className="home__category-card"
                            >
                                <span className="home__category-name">{category.name}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="home__promos">
                    {promos.map((p) => (
                        <Link key={p.title} to={p.to} className="home__promo">
                            <div className="home__promo-body">
                                <h3 className="home__promo-title">{p.title}</h3>
                                <p className="home__promo-text">{p.text}</p>
                                <span className="home__promo-link">See more →</span>
                            </div>
                        
                        </Link>
                    ))}
                </section>

                <section className="home__featured">
                    <div className="home__featured-head">
                        <h2 className="home__featured-title">Featured</h2>
                        <Link
                            to="/shop/all-products" className="home__featured-all"
                        >
                            View all
                        </Link>
                    </div>

                    <div className="home__featured-grid">
                        {featured.map((p) => (
                            <Link
                                key={p.id}
                                to={`/product/${p.id}`}
                                className="home__featured-card"
                            >
                                <img 
                                    src={p.imageUrl}
                                    alt={p.title}
                                    className="home__featured-img"
                                />
                                <div className="home__featured-info">
                                    <h3 className="home__featured-name">{p.title}</h3>
                                    <span className="home__featured-price">
                                        ${p.price.toFixed(2)}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Home;