import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedValue } from "../context/hooks/useDebouncedValue";


type Props = { categories: string[] };

export default function FiltersBar({ categories}: Props) {
    const [sp, setSp] = useSearchParams();

    const uniqueCats = useMemo(
        () => Array.from(new Set(categories.filter(Boolean))),
        [categories]
    );

    const values = useMemo(() => ({
        q: sp.get("q") ?? "",
        cat: sp.get("cat") ?? "",
        min: sp.get("min") ?? "",
        max: sp.get("max") ?? "",
        sort: sp.get("sort") ?? "",
    }), [sp]);

    // local state only for q

    const [qLocal, setQLocal] = useState(values.q);
    useEffect(() => setQLocal(values.q), [values.q]);

    const qDebounced = useDebouncedValue(qLocal, 350);

    useEffect(() => {
        const next = new URLSearchParams(sp);
        if (qDebounced.trim()) next.set("q", qDebounced);
        else next.delete("q");
        setSp(next, { replace: true });
    }, [qDebounced]) // eslint-disable-line react-hooks/exhaustive-deps


    const set = (key: string, val: string) => {
        const next = new URLSearchParams(sp);
        const clean = val.trim();
        if (clean !== "") {
            next.set(key, clean);
        } else {
            next.delete(key);
        }
        next.delete("page");
        setSp(next, { replace: true });
    };

    return (
        <div className="filters">
            <input 
                className="filters__input"
                placeholder="Search product..."
                value={values.q}
                onChange={(e) => set("q", e.target.value)}
            />

            <select 
                className="filters__select"
                value={values.cat}
                onChange={(e) => set("cat", e.target.value)}
            >
                <option value="">All categories</option>
                <option value="Candles">Candles</option>
                <option value="Clothing">Clothing</option>
                <option value="Accessories">Accessories</option>
                <option value="Bags">Bags</option>
                <option value="Sale">Sale</option>
                {uniqueCats.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}

            </select>

            <input 
                className="filters__input filters__input--num"
                type="number" min="0" step="0.01"
                placeholder="Min price"
                value={values.min}
                onChange={(e) => set("min", e.target.value)}
            />

            <input 
                className="filters__input filters__input--num"
                type="number" min="0" step="0.01"
                placeholder="Max price"
                value={values.max}
                onChange={(e) => set("max", e.target.value)}
            />

            <select 
                className="filters__select"
                value={values.sort}
                onChange={(e) => set("sort", e.target.value)}
            >
                <option value="">Sort by</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
            </select>


            <button 
                className="filters__clear" 
                onClick={() => setSp({}, {replace: true})}
                >
                    Reset
            </button>
        </div>
    )
}

