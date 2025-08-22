import { Link } from "react-router-dom";


const categories = [
    { name: "Clothing", path: "/shop/clothing" },
    { name: "Candles", path: "/shop/candles"},
    { name: "Accessories", path: "/shop/accessories"},
    { name: "Bags", path: "/shop/bags"},
    { name: "Sale", path: "/shop/sale"},
];

// Home component for the main page
const Home: React.FC = () => {
    return (
        <section className="home">
            <div className="container hero__content">
                <div className="home__hero">
                    <h1 className="home__title">
                        Welcome to CozyHands Marketplace
                    </h1>
                    <p className="home__subtitle">Discover handcrafted treasures made with love.</p>
                </div>
                
                {/* Product Categories Section*/}
                <div className="home__categories">
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
                </div>
                {/* // Call to action button to shop now */}
                <Link to="/shop" className="home__cta-btn">
                    Shop Now
                </Link>
            </div>
        </section>
    );
};

export default Home;