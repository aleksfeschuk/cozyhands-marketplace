import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";;
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

const ProductDetails: React.FC = () => {
    // Get the ID parameter from the URL
    const ID = useParams<{ id: string }>().id;
    const [product, setProduct] = useState<Product | null>(null);

    // Effect for loading a product when changing the ID
    useEffect(() => {
        const foundProduct = mockProducts.find((p) => p.id === ID);
        setProduct(foundProduct || null);
    }, [ID])

    if (!product) {
        return <div className="product-details">Product not found</div>
    }

    return (
        <section className ="product-details">
            <div className = "container product-details__container">
                <div className="product-details__image">
                    <img 
                        src={product.imageUrl}
                        alt={product.title}
                        className="product-details__img"
                    />
                </div>
                <div className="product-details__info">
                    <h2 className="product-details__title">{product.title}</h2>
                    <p className="product-details__category">{product.category}</p>
                    <p className="product-details__price">${product.price.toFixed(2)}</p>
                    <p className="product-details__description">{product.description}</p>

                    <button className="product-details__add-btn">Add to Cart</button>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
