import { Link } from "react-router-dom";
import type { Product } from "../types/index";
import '../styles/AllProducts.scss';

const mockProducts: Product[] = [
  {
    id: "1",
    title: "Handwoven Wool Scarf",
    price: 29.99,
    category: "Accessories",
    description: "Warm and cozy scarf crafted from natural wool.",
    imageUrl: "/assets/scarf.jpg",
  },
  {
    id: "2",
    title: "Eco-Friendly Tote Bag",
    price: 19.99,
    category: "Accessories",
    description: "Stylish tote bag made from recycled cotton.",
    imageUrl: "/assets/tote-bag.jpg",
  },
  {
    id: "3",
    title: "Knitted Cotton Sweater",
    price: 49.99,
    category: "Clothing",
    description: "Soft sweater perfect for cool evenings.",
    imageUrl: "/assets/sweater.jpg",
  },
];

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
