import { Link } from "react-router-dom";
import { mockProducts } from "../data/products";

const Bags: React.FC = () => {
    const bagProducts = mockProducts.filter(
        (product) => product.category.toLowerCase() === "bags"
    );

    if (bagProducts.length === 0) {
        return (
            <section className="bags">
                <div className="container bags__container">
                    <h2 className="bags__title">Bags</h2>
                    <p className="bags__empty">No products available in this category.</p>
                </div>
            </section>
        );
    } 

    return (
        <section className="bags">
            <div className="container bags__container">
                <h2 className="bags__title">Bags</h2>
                <div className="bags__grid">
                    {bagProducts.map((product) => (
                        <div key={product.id} className="bags__product-card">
                            <div className="bags__product-image">
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.title}
                                    className="bags__product-img" 
                                />
                            </div>
                            <div className="bags__product-info">
                                <h3 className="bags__product-title">{product.title}</h3>
                                <p className="bags__product-category">{product.category}</p>
                                <p className="bags__product-price">${product.price.toFixed(2)}</p>

                                <p className="bags__product-description">{product.description}</p>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="bags__product-link"
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

export default Bags;