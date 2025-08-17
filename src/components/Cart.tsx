import { useState, useEffect } from 'react';
import type { CartItem } from '../types/index';
import { useCart } from '../context/CartContext';

// const initialCartItems: CartItem[] = [
//   {
//     id: "1",
//     title: "Handwoven Wool Scarf",
//     price: 29.99,
//     quantity: 1,
//     imageUrl: "/assets/scarf.jpg",
//   },
//   {
//     id: "2",
//     title: "Eco-Friendly Tote Bag",
//     price: 19.99,
//     quantity: 2,
//     imageUrl: "/assets/tote-bag.jpg",
//   },
// ];

const Cart: React.FC = () => {
    
    const { cartItems, removeFromCart, updateQuantity } = useCart(); 
    
    // Effect for updating the total amount
    const [total, setTotal] = useState(0);

    const renderCartItem = (item: CartItem ) => (
      <div key={item.id} className="cart__item">
        <div className="cart__item-image">
          <img src={item.imageUrl} alt={item.title} className="cart__item-img" />
        </div>
        <div className="cart__item-info">
          <h3 className="cart__item-title">{item.title}</h3>
          <p className="cart__item-price">${(item.price * item.quantity).toFixed(2)}</p>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.target.value);
              if (newQuantity >= 1 ) {
                updateQuantity(item.id, newQuantity);
              } else {
                e.target.value = item.quantity.toString();
              }
            }}
            className="cart__item-quantity"
            />
            <button
              onClick={() => removeFromCart(item.id)}
              className="cart__item-remove"
              >
                Remove
            </button>
        </div>
      </div>
    )


    useEffect(() => {
      const newTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0);
        setTotal(newTotal);
      }, [cartItems]);

    return (
    <section className="cart">
      <div className="container cart__container">
        <h2 className="cart__title">Your Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="cart__empty">Your cart is empty</p>
        ) : (
          <>
            <div className="cart__items">
              {cartItems.map(renderCartItem)}
            </div>
            <div className="cart__summary">
              <p className="cart__total">
                Total: <strong>${total.toFixed(2)}</strong>
              </p>
              <button className="cart__checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
