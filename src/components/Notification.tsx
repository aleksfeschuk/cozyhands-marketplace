import { useState, useEffect } from "react";

const Notification: React.FC<{ message: string; onClose: () => void }> = ({
    message, 
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!isVisible) return null;

    return (
        <div className="notification" role="status" aria-live="polite">
            <p>{message}</p>
        </div>
    )
}

export default Notification;