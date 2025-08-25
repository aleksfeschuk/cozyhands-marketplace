import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Product } from "../types/index";
import { mockProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import  Notification  from "./Notification";
import { useWishlist } from "../context/WishListContext";


const ProductDetails: React.FC = () => {
    // Get the ID parameter from the URL
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [isEditing, setIsEditing ] = useState(false);
    const [editedProduct, setEditedProduct ] = useState<Product | null>(null)
    
    const { addToCart } = useCart();
    const { has, toggle} = useWishlist();

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    // Effect for loading a product when changing the ID
    useEffect(() => {
        if (!id) return;
        const foundProduct = mockProducts.find((p) => p.id === id);
        setProduct(foundProduct || null);
        setEditedProduct(foundProduct || null);
    }, [id]);

    if (!product) {
        return (
            <section className="product-details">
                <div className="container product-details__container">
                    <p>Product not found</p>
                </div>
            </section>
        );
    }

    // Processing changes to form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editedProduct) {
            setEditedProduct({
                ...editedProduct,
                [name]: name === "price" ? parseFloat(value) || 0 : value,
            } as Product);
        }
    };

    const handleSave = () => {
        if (editedProduct && product) {
            if (editedProduct.price <= 0) {
                alert("Price must be greater than 0!");
                return;
            }
            const updatedProducts = mockProducts.map((p) => 
                p.id === editedProduct.id ? editedProduct : p
            );
            setProduct(editedProduct);
            mockProducts.length = 0;
            mockProducts.push(...updatedProducts);

            setIsEditing(false);
            setNotificationMessage("You have successfully edited the product!");
            setShowNotification(true);
        }
    };

    const handleCancel = () => {
        setEditedProduct(product);
        setIsEditing(false);
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
                    <img 
                        src={product.imageUrl}
                        alt={product.title}
                        className="product-details__img"
                    />
                </div>
                <div className="product-details__info">
                    {isEditing  ? (
                        <>
                            <input 
                                type="text"
                                name="title"
                                value={editedProduct?.title || ""}
                                onChange={handleChange}
                                className="product-details__edit-input"  
                            />

                            <input
                                type="number"
                                name="price"
                                value={editedProduct?.price ?? 0}
                                onChange={handleChange}
                                className="product-details__edit-input"
                                step="0.01"
                                min="0.01"
                            />

                            <input 
                                type="text"
                                name="description"
                                value={editedProduct?.description || ""}
                                onChange={handleChange}
                                className="product-details__edit-input"
                            />

                            <button
                                onClick={handleSave}
                                className="product-details__save-btn"
                            >Save</button>
                            <button
                                onClick={handleCancel}
                                className="product-details__cancel-btn"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                        
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
                            <button
                                onClick={() => setIsEditing(true)}
                                className="product-details__edit-btn"
                            >
                                Edit
                            </button>
                        </>
                    )}
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
