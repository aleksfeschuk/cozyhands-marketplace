import { Link } from "react-router-dom";


// Home component for the main page
const Home: React.FC = () => {
    return (
        <section className="hero">
            <div className="container hero__content">
                <h1 className="hero__title">
                    Discover Handcrafted Treasures at CozyHands
                </h1>
                <p className="hero__subtitle">
                    Explore our unique collection of clothing and accessories, made
                    with love and care.
                </p>

                {/* // Call to action button to shop now */}
                <Link to="/shop" className="hero__cta-btn">
                    Shop Now
                </Link>
            </div>
        </section>
    );
};

export default Home;