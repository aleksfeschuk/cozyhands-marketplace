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

const featured = mockProducts.filter((p) => p.featured);

const reviews = [
    {
        id: "r1",
        name: "Hannah K.",
        avatar: "/assets/avatars/hannah.jpg",
        text: "I wasn't expecting to love a scarf this much, but wow. The wool has that perfect balance of minimal and vintage, and it feels unbelievably soft.",
        productTitle: "Handwoven Wool Scarf",
        productLink: "/product/1",
        rating: 5,
    },
    {
        id: "r2",
        name: "Ethan V.",
        avatar: "/assets/avatars/ethan.jpg",
        text: "This candle surprised me with its subtle scent and gentle glow. Perfect for a cozy evening after work.",
        productTitle: "Soy Wax Candle",
        productLink: "/product/4",
        rating: 5,
    },
];

    //newsletter

const handleNewsLetterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = data.get("email");

    console.log("NewsLetter email:", email);
    form.reset();
}

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
                                {p.discount && p.discount > 0 && (
                                    <span className="home__badge-discount">
                                        {Math.round(p.discount * 100)} % OFF
                                    </span>
                                )}
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

                {/* REVIEWS*/}

                <section className="home__reviews">
                    <h2 className="home__section-title">Customer Reviews</h2>

                    <div className="home__reviews-grid">
                        {reviews.map((r) => (
                            <article key={r.id} className="home__review-card">
                                <div className="home__review-media">
                                    <img 
                                        src={r.avatar} 
                                        alt={r.name} 
                                        className="home__review-avatar"
                                    />
                                </div>

                                <div className="home__review-body">
                                    <div className="home__review-stars" aria-label={`${r.rating} out of 5`}>
                                        {"★".repeat(r.rating)}
                                    </div>

                                    <h3 className="home__review-title">Love It!</h3>
                                    <p className="home__review-text">{r.text}</p>
                                    
                                    <div className="home__review-footer">
                                        <span className="home__review-author">{r.name}</span>
                                        <Link
                                            to={r.productLink} className="home__review-product">
                                                {r.productTitle}
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="home__blogteaser">
                    <div className="home__featured-head">
                        <h2 className="home__featured-title">From our Blog</h2>
                        <Link to="/blog" className="home__featured-all">View all</Link>
                    </div>

                    <div className="home__featured-grid">
                        <Link to="/blog?id=craft-fair-journey" className="home__featured-card">
                            <div className="home__featured-info">
                                <h3 className="home__featured-name"> Our Craft Fair Journey</h3>
                                <span className="home__featured-price">Read →</span>
                            </div>
                        </Link>
                        <Link to="/blog?id=material-matter" className="home__featured-card">
                            <div className="home__featured-info">
                                <h3 className="home__featured-name">Materials Matter</h3>
                                <span className="home__featured-price">Read →</span>
                            </div>
                        </Link>
                    </div>
                </section>

                <section className="home__newsletter">
                        <div className="home__newsletter-card">
                            <h2 className="home__section-title home__newsletter-title">Stay in the loop</h2>
                            <p className="home__newsletter-text">
                                Join our newsletter to get updates on new arrivals and special offers.
                            </p>
                            <form className="home__newsletter-form" onSubmit={handleNewsLetterSubmit}>
                                <input 
                                    type="email" 
                                    name="email"
                                    className="home__newsletter-input"
                                    placeholder="Enter your email"
                                    required
                                />
                                <button className="home__newsletter-btn" type="submit">Subscribe</button>
                            </form>
                            <p className="home__newsletter-hint">We respect your privacy - no spam</p>
                        </div>
                    </section>
            </div>
        </section>
    );
};

export default Home;