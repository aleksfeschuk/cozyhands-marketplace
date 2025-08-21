import { Link } from "react-router-dom";
import { mockProducts } from "../data/products";
import '../styles/AllProducts.scss';


const AllProducts: React.FC = () => {
    return (
        <section className="all-products">
            <div className="container all-products__container">
                <h2 className="all-products__title">All products</h2>
                <div className="all-products__grid">
                    {mockProducts.map((product) => (
                        <div key={product.id} className="all-products__product-card">
                            <div className="all-products__product-image">
                                <img 
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="all-products__product-img"
                                />
                            </div>
                            <div className="all-products__product-info">
                                <h3 className="all-products__product-title">{product.title}</h3>
                                <p className="all-products__product-category">{product.category}</p>
                                <p className="all-products__product-price">${product.price.toFixed(2)}</p>
                                <p className="all-products__product-description">{product.description}</p>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="all-products__product-link">
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

export default AllProducts;
