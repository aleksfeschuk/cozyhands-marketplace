import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../types/index';
import { useCart } from '../context/CartContext';
import Notification from './Notification';



const Cart: React.FC = () => {
    
    const { cartItems, removeFromCart, updateQuantity } = useCart(); 
    const [total, setTotal] = useState(0);
    const [showApplicationForm, setShowApplicantForm] = useState(false);
    const [applicantName, setApplicantName] = useState("");
    const [applicantEmail, setApplicantEmail] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
      const newTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotal(newTotal);
    }, [cartItems]);

    const handleSubmitOrder = () => {
      if (applicantName && applicantEmail) {
        const orderDetails = {
          cartItems,
          applicantName,
          applicantEmail,
          total,
          date: new Date().toISOString(),
        };
        localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
        navigate("/confirmation", { state: orderDetails });
        setShowApplicantForm(false);
        setNotificationMessage("Order placed!");
        setShowNotification(true);
      } else {
        setNotificationMessage("Please fill in all fields!")
        setShowNotification(true);
      }
    }

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
              {showApplicationForm ? (
                <>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="cart__input"
                  />
                  <input 
                    type="email"
                    placeholder="Your Email"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="cart__input" 
                  />
                  <button
                    onClick={handleSubmitOrder}
                    className="cart__submit-btn"
                  >
                    Submit Order
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowApplicantForm(true)}
                  className="cart__checkout-btn">Proceed to Checkout</button>
              )}
            </div>
          </>
        )}
        {showNotification && (
          <Notification
            message={notificationMessage}
            onClose={() => setShowNotification(false)}
          />
        )}
      </div>
    </section>
  );
};

export default Cart;
