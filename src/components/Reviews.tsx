import { useState } from "react";
import { useReviews } from "../context/hooks/useReviews";
import { addReview } from "../data/reviewsApi";
import { useAuth } from "../context/hooks/useAuth";
import type { Timestamp } from "firebase/firestore";

type Props = {
    productId: string;
}

function toDateStr(v: Timestamp | Date | string | number | null | undefined): string {
    if (!v) return "";
    let date: Date;

    if (typeof v === "object" && "toDate" in v && typeof v.toDate === "function") {
        date = v.toDate();
    } else if (typeof v === "number" || typeof v === "string") {
        date = new Date(v);
    } else {
        return ""
    }

    return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
}

export default function Reviews({ productId }: Props) {
    
    const {items, loading} = useReviews(productId);
    const { user } = useAuth();
    
    const [author, setAuthor] = useState(user?.displayName || "");
    const [rating, setRating] = useState(5);
    const [text, setText] = useState("");

    const submit = async () => {
        if (!author.trim()) return alert("Enter your name");
        if (!text.trim() || text.trim().length < 4) return alert("The text is too short ");
        if (rating < 1 || rating > 5) return alert("Rating must be between 1 and 5");

        try {
        await addReview({
            productId,
            author: author.trim(),
            rating,
            text: text.trim(),
            userId: user?.uid ?? null,
        });
            setText("");
            setRating(5);
            if (!user?.displayName) setAuthor("");
        } catch (e) {
            const msg = e instanceof Error ? e.message : "Failed to submit review";
            alert(msg);
        };
    }

    

    const avg = items.length
        ? (items.reduce((sum, r) => sum + (r.rating || 0), 0) / items.length).toFixed(1)
        : null;

    return (
        <section className="reviews">
            <h3 className="reviews__title"> 
                
                Reviws {avg ? `• Average rating: ${avg} ★` : ""}
            </h3>

            <div className="reviews__form">
                <input
                    placeholder="Your name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="reviews__input"
                />
                <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))} className="reviews__select">
                    {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} ★</option>)}
                </select>

                <textarea 
                    placeholder="Share your experience..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="reviews__textarea"
                    rows={3}
                />
                
                <button onClick={submit} className="reviews__btn">Submit review</button>

                {!user && (
                    <p className="reviews__hint">
                        * You are not logged in - review will be posted as a guest (userId: null)
                    </p>
                )}
            </div>

            {loading ? (
                <p style={{ opacity: 0.7}}>Loading...</p>
            ) : (
                <ul className="reviews__list">
                    {items.map(r => (
                        <li key={r.id} className="reviews__item">
                            <div className="reviews__meta">
                                <strong>{r.author}</strong>
                                <span>· {toDateStr(r.createdAt)}</span>
                                <span className="reviews__stars">{"★".repeat(r.rating)}</span>
                            </div>
                            <p className="reviews__text">{r.text}</p>
                        </li>
                    ))}
                    {items.length === 0 && <p>No reviews yet. Be the first</p>}
                </ul>
            )}
        </section>
    );
};