import { useEffect, useState } from "react";
import type { Review } from "../types/index";

export default function Reviews({ productId }: {productId: string}) {
    const key = `reviews:${productId}`;
    const [items, setItems] = useState<Review[]>(() => {
        try {
            return JSON.parse(localStorage.getItem(key) || "[]");
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(items)); 
    }, [items, key]);

    const [author, setAuthor] = useState("");
    const [rating, setRating] = useState(5);
    const [text, setText] = useState("");

    const add = () => {
        if (!author.trim() || !text.trim()) return;
        const r: Review = {
            id: crypto.randomUUID(),
            productId,
            author: author.trim(),
            rating,
            text: text.trim(),
            date: new Date().toISOString(),
        };
        setItems([r, ...items]);
        setAuthor("");
        setText("");
        setRating(5);
    };

    return (
        <section className="reviews">
            <h3 className="reviews__title"> Customer Reviews</h3>

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
                
                <button onClick={add} className="reviews__btn">Submit review</button>
            </div>

            <ul className="reviews__list">
                {items.map(r => (
                    <li key={r.id} className="reviews__item">
                        <div className="reviews__meta">
                            <strong>{r.author}</strong>
                            <span>· {new Date(r.date).toLocaleDateString()}</span>
                            <span className="reviews__stars">{"★".repeat(r.rating)}</span>
                        </div>
                        <p className="reviews__text">{r.text}</p>
                    </li>
                ))}
                {items.length === 0 && <p>No reviews yet. Be the first</p>}
            </ul>
        </section>
    );
}