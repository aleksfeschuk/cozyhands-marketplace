import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { useProducts } from "../context/hooks/useProducts";
import Pagination from "./Pagination";
import type { Product } from "../types";
import FiltersBar from "./FilterBar";
import '../styles/AllProducts.scss';
import { ProductImage } from "./ProductImage";


function toMs(v: unknown): number {
    if (v && typeof v === "object" && typeof (v as {toMillis?: () => number}).toMillis === "function") {
        return (v as {toMillis: () => number}).toMillis();
    }
    if (typeof v === "number") return v;
    if (typeof v === "string") {
        const t = Date.parse(v);
        return isNaN(t) ? 0 : t;
    }
    return 0;
}

function applyFilterSort(sp: URLSearchParams, items: Product[]): Product[] {
    let list = [...items];

    const q = (sp.get("q") ?? "").trim().toLowerCase();
    const cat = (sp.get("cat") ?? "");
    const min = parseFloat(sp.get("min") ?? "");
    const max = parseFloat(sp.get("max") ?? "");
    const sort = sp.get("sort") ?? "";

    if (q) list = list.filter((p) => p.title.toLowerCase().includes(q));
    if (cat) list = list.filter((p) => p.category === cat);
    if (!isNaN(min)) list = list.filter((p) => p.price >= min);
    if (!isNaN(max)) list = list.filter((p) => p.price <= max);

    switch (sort) {
        case "price-asc": 
            list.sort((a, b) => a.price - b.price); 
            break;
        case "price-desc": 
            list.sort((a, b) => b.price - a.price); 
            break;
        case "rating": 
            list.sort((a, b) => (b.ratingAvg ?? 0) - (a.ratingAvg ?? 0));
            break;
        case "newest":
            list.sort((a, b) => toMs(b.createdAt) - toMs(a.createdAt));
            break;
    }
    return list;
}



const AllProducts: React.FC = () => {

    const [sp] = useSearchParams();
    const {items, loading} = useProducts();

    const perPage = 12;
    const page = Math.max(parseInt(sp.get("page") ?? "1", 10) || 1, 1);

    const categories = useMemo(
        () => Array.from(new Set(items.map(p => p.category))).filter(Boolean),
        [items]
    );

    const filtered = useMemo(() => applyFilterSort(sp, items), [sp, items]);

    if (loading) return <div className="container">Loading...</div>

    const start = (page - 1) * perPage;
    const paged = filtered.slice(start, start + perPage);
    

    return (
        <section className="all-products">
            <div className="container all-products__container">
                <h2 className="all-products__title">All products</h2>

                <FiltersBar categories={categories} />

                <div className="all-products__grid">
                    {paged.map((product) => (
                        <div key={product.id} className="all-products__product-card">
                            <div className="all-products__product-image">
                                <ProductImage 
                                    imageUrl={product.imageUrl}
                                    imagePath={product.imagePath}
                                    alt={product.title}
                                    className="all-products__product-img"
                                />
                                {product.discount && product.discount > 0 && (
                                    <span className="all-products__badge">
                                        {Math.round(product.discount * 100)}% OFF
                                     </span>
                                )}

                            </div>
                            <div className="all-products__product-info">
                                <h3 className="all-products__product-title">{product.title}</h3>
                                <p className="all-products__product-category">{product.category}</p>
                                <p className="all-products__product-price">${product.price.toFixed(2)}</p>
                                <p className="all-products__product-description">{product.description}</p>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="all-products__product-link">
                                        View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                    {paged.length === 0 && <p>No products match your filters</p>}
                </div>
            </div>

            <Pagination total={filtered.length} perPage={perPage} />
        </section>
    )
}

export default AllProducts;
