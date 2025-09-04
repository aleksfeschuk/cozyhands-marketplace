import { useParams } from "react-router-dom";
import { useState } from "react";
import { useProduct } from "../context/hooks/useProduct";
import { useCart } from "../context/CartContext";
import  Notification  from "./Notification";
import { useWishlist } from "../context/hooks/useWishlist";
import Reviews from "./Reviews";
import { ProductImage } from "./ProductImage";



const ProductDetails: React.FC = () => {
    // Get the ID parameter from the URL
    const { id } = useParams<{ id: string }>();
    const { item: product, loading } = useProduct(id);
    

    const { addToCart } = useCart();
    const { has, toggle} = useWishlist();

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    if (loading) {
        return (
            <section className="product-details">
                <div className="container">Loading...</div>
            </section>
        );
    }

    if (!product) {
        return (
            <section className="product-details">
                <div className="container">Product not found</div>
            </section>
        )
    }

    


    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl,
        });
        setNotificationMessage("You have successfully added the item to your cart!");
        setShowNotification(true);
    };

    return (
        <section className ="product-details">
            <div className = "container product-details__container">
                <div className="product-details__image">
                    <ProductImage
                        imageUrl={product.imageUrl}
                        imagePath={product.imagePath}
                        alt={product.title}
                        className="product-details__img"
                    />
                </div>
                <div className="product-details__info">
                    
                    <h2 className="product-details__title">{product.title}</h2>
                    <p className="product-details__category">{product.category}</p>
                    <p className="product-details__price">${product.price.toFixed(2)}</p>
                    <p className="product-details__description">{product.description}</p>

                    <button
                        onClick={handleAddToCart}
                        className="product-details__add-btn"
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={() => toggle(product.id)}
                        className="product-details__wishList-btn"
                        aria-pressed={has(product.id)}
                        title={has(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            {has(product.id) ? "♥ In Wishlist" : "♡ Add to Wishlist"}
                    </button>

                    <Reviews productId={product.id}/>
                </div>
            </div>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    onClose={() => setShowNotification(false)}
                />
            )}
        </section>
    );
};

export default ProductDetails;
