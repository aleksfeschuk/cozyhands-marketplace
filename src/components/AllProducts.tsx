import { Link, useSearchParams } from "react-router-dom";
import { mockProducts } from "../data/products";
import FiltersBar from "./FilterBar";
import '../styles/AllProducts.scss';

const categories = Array.from(new Set(mockProducts.map(p => p.category)));

function applyFilterSort(sp: URLSearchParams) {
    let list = [...mockProducts];

    const q = (sp.get("q") ?? "").trim().toLowerCase();
    const cat = (sp.get("cat") ?? "");
    const min = parseFloat(sp.get("min") ?? "");
    const max = parseFloat(sp.get("max") ?? "");
    const sort = sp.get("sort") ?? "";

    if (q) list = list.filter(p => p.title.toLowerCase().includes(q));
    if (cat) list = list.filter(p => p.category === cat);
    if (!isNaN(min)) list = list.filter(p => p.price >= min);
    if (!isNaN(max)) list = list.filter(p => p.price <= max);

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
            list.sort((a, b) => {
                const dateA = new Date(a.createdAt ?? 0).getTime();
                const dateB = new Date(b.createdAt ?? 0).getTime();
                return dateB - dateA;
            });
            break;
    }
    return list;
}

const AllProducts: React.FC = () => {

    const [sp] = useSearchParams();
    const products = applyFilterSort(sp);

    return (
        <section className="all-products">
            <div className="container all-products__container">
                <h2 className="all-products__title">All products</h2>

                <FiltersBar categories={categories}></FiltersBar>

                <div className="all-products__grid">
                    {products.map((product) => (
                        <div key={product.id} className="all-products__product-card">
                            <div className="all-products__product-image">
                                <img 
                                    src={product.imageUrl}
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
                    {products.length === 0 && <p>No products match your filters</p>}
                </div>
            </div>
        </section>
    )
}

export default AllProducts;
