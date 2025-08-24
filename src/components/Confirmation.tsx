import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { CartItem } from "../types";


interface ConfirmationData {
    cartItems: CartItem[];
    applicantName: string;
    applicantEmail: string;
    total: number;
}


// Confirmation page component
const Confirmation: React.FC = () => {
    const { state } = useLocation() as {state: ConfirmationData | null };
    const navigate = useNavigate();

    useEffect(() => {
        if(!state) {
            navigate("/cart");
        }
    }, [state, navigate]);

    if (!state) {
        return null;
    }

    const { cartItems, applicantName, applicantEmail, total } = state;

    return (
        <section className="confirmation">
            <div className="container confirmation__container">
                <h2 className="confirmation__title">Order Confirmation</h2>
                <p className="confirmation__message">
                    Thank you, {applicantName}! Your order has been successfully placed.
                </p>
                <p className="confirmation__details">Email: {applicantEmail}</p>
                <div className="confirmation__items">
                    {cartItems.map((item) => (
                        <div key={item.id} className="confirmation__item">
                            <span>{item.title}</span>
                            <span>${item.price.toFixed(2)}</span>
                            <span>Qty: {item.quantity}</span>
                            <span>Subtotal: ${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <p className="confirmation__total">
                    Total price: <strong>${total.toFixed(2)}</strong>
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="confirmation__back-btn">
                    Return to home page
                </button>
            </div>
        </section>
    );
};

export default Confirmation;