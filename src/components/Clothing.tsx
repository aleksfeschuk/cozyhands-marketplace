import { Link } from "react-router-dom";
import { mockProducts } from "../data/products";
import "../styles/Clothing.scss";

const Clothing: React.FC = () => {
    // Filter products, leaving only those that belong to the “Clothing” category
    const clothingProducts = mockProducts.filter(
        (product) => product.category.toLowerCase() === 'clothing'
    );

    if (clothingProducts.length === 0) {
        return (
            <section className="clothing">
                <div className="container clothing__container">
                    <h2 className="clothing__title">Clothing</h2>
                    <p className="clothing__empty">No products available in this category.</p>
                </div>
            </section>
        )
    }

    return (
        <section className="clothing">
            <div className="container clothing__container">
                <h2 className="clothing__title">Clothing</h2>
                <div className="clothing__grid">
                    {clothingProducts.map((product) => (
                        <div key={product.id} className="clothing__product-card">
                            
                            {/* Container for image*/}
                            <div className="clothing__product-image">
                                <img 
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="clothing__product-img"
                                />
                            </div>

                            {/* Container for the information products*/}
                            <div className="clothing__product-info">
                                <h3 className="clothing__product-title">{product.title}</h3>
                                <p className="clothing__product-category">{product.category}</p>
                                <p className="clothing__product-price">${product.price.toFixed(2)}</p>
                                <p className="clothing__product-description">{product.description}</p>

                                <Link
                                    to={`/product/${product.id}`}
                                    className="clothing__product-link">
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

export default Clothing;