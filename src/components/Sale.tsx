import { Link } from "react-router-dom";
import { mockProducts } from "../data/products";

const Sale: React.FC = () => {
    const saleProducts = mockProducts.filter((product) => product.price < 20);

    if (saleProducts.length === 0) {
        return (
            <section className="sale">
                <div className="container sale-container">
                    <h2 className="sale__title">Sale</h2>
                    <p className="sale__empty">No products on sale at the moment.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="sale">
            <div className="container sale__container">
                <h2 className="sale__title">Sale</h2>
                <div className="sale__grid">
                    {saleProducts.map((product) => (
                        <div key={product.id} className="sale__product-card">
                            <div className="sale__product-image">
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.title} 
                                    className="sale__product-img"
                                />
                            </div>
                            <div className="sale__product-info">
                                <h3 className="sale__product-title">{product.title}</h3>
                                <p className="sale__product-category">{product.category}</p>
                                <p className="sale__product-price">
                                    <span style={{ textDecoration: "line-through" }}>
                                        ${product.price.toFixed(2)}
                                    </span> {" "}
                                    ${(product.price * 0.8).toFixed(2)} (20% off)
                                </p>
                                <p className="sale__product-description">{product.description}</p>
                                <Link
                                    to={`/product/${product.id}`} className="sale__product-link">
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

export default Sale;