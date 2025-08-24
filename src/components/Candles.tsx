import { Link } from "react-router-dom";
import { mockProducts } from "../data/products";
import "../styles/Candles.scss";



const Candles: React.FC = () => {
    const candlesProducts = mockProducts.filter(
        (product) => product.category.toLowerCase() === "candles"
    );

    if (candlesProducts.length === 0) {
        return (
            <section className="candles">
                <div className="container candles__container">
                    <h2 className="candles__title">Candles</h2>
                    <p className="candles__empty">No products available in this category.</p>
                </div>
            </section>
        )
    }

    return (
        <section className="candles">
            <div className="container candles__container">
                <h2 className="candles__title">Candles</h2>
                <div className="candles__grid">
                    {candlesProducts.map((product) => (
                        <div key={product.id} className="candles__product-card">
                            <div className="candles__product-image">
                                <img 
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="candles__product-img" 
                                />
                            </div>
                            <div className="candles__product-info">
                                <h3 className="candles__product-title">{product.title}</h3>
                                <p className="candles__product-category">{product.category}</p>
                                <p className="candles__product-price">${product.price.toFixed(2)}</p>
                                <p className="candles__product-description">{product.description}</p>

                                <Link
                                    to={`/product/${product.id}`}
                                    className="candles__product-link"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Candles;