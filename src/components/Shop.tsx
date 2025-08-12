import { Link } from "react-router-dom";
import type { Product } from "../types/index";

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

const Shop: React.FC = () => {
    return (
        <section className="shop">
            <div className="container shop__container">
                <h2 className="shop__title">Our Handcrafted Collection</h2>
                <div className="shop__grid">
                    {mockProducts.map((product) => (
                        <div key={product.id} className="shop__product-card">
                            <div className="shop__product-image">
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.title} 
                                    className="shop__product-img"/>
                            </div>
                            <div className="shop__product-info">
                                <h3 className="shop__product-title">{product.title}</h3>
                                <p className="shop__product-category">{product.category}</p>
                                <p className="shop__product-price">${product.price.toFixed(2)}</p>

                                {/* // Link to individual product page */}
                                <Link to={`/product/${product.id}`} className="shop__product-link">
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

export default Shop;