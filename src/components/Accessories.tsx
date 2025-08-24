import { Link } from "react-router-dom";
import { mockProducts } from "../data/products";

const Accessories: React.FC = () => {
    const accessoryProducts = mockProducts.filter(
        (product) => product.category.toLowerCase() === "accessories"
    );

    if (accessoryProducts.length === 0) {
        return (
            <section className="accessories">
                <div className="container accessories__container">
                    <h2 className="accessories__title">Accessories</h2>
                    <p className="accessories__empty">No products available in this category.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="accessories">
            <div className="container accessories__container">
                <h2 className="accessories__title">Accessories</h2>
                <div className="accessories__grid">
                    {accessoryProducts.map((product) => (
                        <div key={product.id} className="accessories__product-card">
                            <div className="accessories__product-image">
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.title} 
                                    className="accessories__product-img"/>
                            </div>
                            <div className="accessories__product-info">
                                <h3 className="accessories__product-title">{product.title}</h3>
                                <p className="accessories__product-category">{product.category}</p>
                                <p className="accessories__product-price">${product.price.toFixed(2)}</p>
                                <p className="accessories__product-description">{product.description}</p>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="accessories__product-link"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Accessories;