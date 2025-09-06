import { useMemo, useState } from 'react';
import type { Product } from '../../types/index';
import { useProducts } from "../../context/hooks/useProducts"; 
import { addProduct, updateProduct, deleteProduct,
    type ProductWrite,
 } from '../../data/productsApi';
import { uploadImageFile } from '../../data/storage';
import { ProductImage } from "../ProductImage";


type DraftProduct = Omit<Product, "id" | "createdAt" | "updatedAt"> & { id?: string };
 
    // Edit/add form

const emptyDraft: DraftProduct = {
    title: "",
    price: NaN,
    category: "",
    description: "",
    imageUrl: "",
    featured: false,
    discount: 0,
};

type SortOption = "new" | "price-asc" | "price-desc";

const AdminProducts: React.FC = () => {

    const { items, loading } = useProducts(); 

    const [draft, setDraft] = useState<DraftProduct>(emptyDraft);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [q, setQ] = useState("");
    const [cat, setCat] = useState("all");
    const [sort, setSort] = useState<SortOption>("new");
    const [error, setError] = useState<string>("");


    const [file, setFile] = useState<File | null>(null);
    const [uploadPct, setUploadPct] = useState<number>(0)
    

    // Categories are dynamically extracted from the list (for filtering)

   const categories = useMemo(
        () =>
            ["all"].concat(
                Array.from(new Set(items.map((p) => p.category).filter(Boolean))).sort()
            ),
        [items]
    );


    // filter and sort list
    const view = useMemo(() => {
        let cur = items.filter(p => 
            p.title.toLowerCase().includes(q.toLowerCase().trim())
        );
        if (cat !== "all") cur = cur.filter(p => p.category === cat);

        switch (sort) {
            case "price-asc":
                cur = [...cur].sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                cur = [...cur].sort((a, b) => b.price - a.price);
                break;
            case "new":
            default: 
                break;
        }
        return cur;
    }, [items, q, cat, sort]);


    // CRUD UI handlers

    const startCreate = () => {
        setEditingId(null);
        setDraft(emptyDraft);
        setError("");
        setFile(null);
        setUploadPct(0);
    };

    const startEdit = (p: Product) => {
        setEditingId(p.id);
        setDraft({
            title: p.title ?? "",
            price:  Number.isFinite(p.price) ? p.price : NaN,
            category: p.category ?? "",
            description: p.description ?? "",
            imageUrl: p.imageUrl ?? "",
            imagePath: p.imagePath ?? "",
            featured: !!p.featured,
            discount: Number.isFinite(p.discount as number) ? Number(p.discount) : 0,
        });
        setError("");
        setFile(null);
        setUploadPct(0);
    };

    const cancel = () => {
        setEditingId(null);
        setDraft(emptyDraft);
        setError("");
        setFile(null);
        setUploadPct(0);
    };

    const save = async () => {
        setError("");

        if (!draft.title.trim()) {
            setError("Title is required");
            return;
        }
        if (!draft.category.trim()) {
            setError("Category is required");
            return;
        }

        const priceNum = Number(draft.price);
        if (!Number.isFinite(priceNum) || priceNum <= 0) {
            setError("Price must be > 0");
            return;
        }

        const d = Number(draft.discount);
        if (Number.isNaN(d) || d < 0 || d > 1) {
            setError("Discount must be 0..1");
            return;
        }

        try {
            let imageUrl = draft.imageUrl.trim();
            let imagePath = draft.imagePath?.trim() ?? "";
            
            if (file) {
                const up = await uploadImageFile(file, { folder: "products", onProgress: setUploadPct });
                imageUrl = up.url;
                imagePath = up.path;
            }

            const payload: ProductWrite = {
                title: draft.title.trim(),
                price: priceNum,
                category: draft.category.trim(),
                description: draft.description.trim(),
                imageUrl,
                imagePath,
                featured: !!draft.featured,
                discount: d || 0,
            };

            if (editingId) await updateProduct(editingId, payload);
            else await addProduct(payload);

            cancel();
        } catch (e) {
            const msg = e instanceof Error ? e.message : "Failed to save product";
            setError(msg);
        }
    };




    const remove = async (id: string) => {
        if (!confirm("Delete this product")) return;
        try {
            await deleteProduct(id);
        } catch (e) {
            const msg = e instanceof Error ? e.message : "Failed to delete product";
            alert(msg);
        };
    };



    return (
        <div className='adminp'>
            <div className='admin__toolbar'>
                <input 
                    className='adminp__search'
                    placeholder="Search by title..."
                    value={q}
                    onChange={e => setQ(e.target.value)}
                />

                <select className="admin__select" value={cat} onChange={e => setCat(e.target.value)}>
                    <option value="">All categories</option>
                    <option value="Candles">Candles</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Bags">Bags</option>
                    <option value="Sale">Sale</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                <select className='adminp__select' value={sort} onChange={e => setSort(e.target.value as SortOption)}>
                    <option value="new">Sort: New</option>
                    <option value="price-asc">Sort: Price ↑</option>
                    <option value="price-desc">Sort: Price ↓</option>
                </select>

                <div className="adminp__spacer">
                    <button className="btn" onClick={startCreate}> + New product</button>
                    
                </div>
            </div>

            {/* Form create/edit */}

            <div className='adminp__form'>
                <h3 className='adminp__form-title'>
                    {editingId ? `Edit: ${editingId}` : "Create product"}
                </h3>

                {error && (
                    <div style={{ marginBottom: 12, color: "#b00020" }}>{error}</div>
                )}

                <div className="adminp__grid">
                    
                    <input 
                        placeholder='Title'
                        value={draft.title}
                        onChange={e => setDraft({...draft, title: e.target.value})}
                    />
                    <input 
                        placeholder='Category'
                        list="categories-datalist"
                        value={draft.category}
                        onChange={(e) => setDraft({...draft, category: e.target.value})}
                    />
                    <datalist id="categories-datalist">
                        <option value="">All categories</option>
                        <option value="Candles">Candles</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Bags">Bags</option>
                        <option value="Sale">Sale</option>
                        {Array.from(new Set(items.map((p) => p.category).filter(Boolean)))
                            .sort()
                            .map((c) => (
                                <option key={c} value={c}/>
                            ))}
                    </datalist>

                    <input 
                        placeholder="Image URL (optional)"
                        value={draft.imageUrl}
                        onChange={(e) => setDraft({ ...draft, imageUrl: e.target.value})}
                    />
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const f = e.target.files?.[0] ?? null;
                            setFile(f);
                        }}
                    />
                    <input 
                        placeholder='Description'
                        value={draft.description}
                        onChange={e => setDraft({...draft, description: e.target.value})}
                    />
                    {uploadPct > 0 && uploadPct < 100 && (
                        <div style={{ fontSize: 12, opacity: 0.8 }}>Uploading: {uploadPct}%</div>
                    )}

                    {/* featured */}

                    <label className="adminp__check">
                        <input 
                            type="checkbox"
                            checked={!!draft.featured}
                            onChange={e => setDraft({ ...draft, featured: e.target.checked })}
                        />
                        Featured
                    </label>

                    {/* price */}

                    <input
                        type="number"
                        step="0.01"
                        min={0.01}
                        placeholder="Price"
                        value={Number.isFinite(draft.price) ? String(draft.price) : ""}
                        onChange={(e) =>
                            setDraft({
                            ...draft,
                            price: e.target.value === "" ? NaN : Number(e.target.value),
                            })
                        }
                    />

                    {/* discount */}
                    <input 
                        type="number"
                        step="0.01"
                        min={0}
                        max={1}
                        placeholder='Discount (0..1)'
                        value={Number.isFinite(draft.discount as number) ? Number(draft.discount) : ""}
                        onChange={(e) =>
                            setDraft({
                            ...draft,
                            discount: Math.max(0, Math.min(1, Number(e.target.value) || 0)),
                            })
                        }
                    />
                </div>

                <div className='adminp__actions'>
                    <button className='btn' onClick={save} >Save</button>
                    <button className='btn btn--guest' onClick={cancel}>Cancel</button>
                </div>


            {loading ? (
                <p style={{opacity: .7}}>Loading...</p>
            ) : (
                    <table className="adminp__table">
                        <thead>
                            <tr>
                                <th style={{width: 90}}>Image</th>
                                <th>ID</th>
                                <th>Title</th>
                                <th style={{width: 100}}>Price</th>
                                <th style={{width: 120}}>Category</th>
                                <th style={{width: 80}}>Featured</th>
                                <th style={{width: 90}}>Discount</th>
                                <th style={{width: 140}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {view.map(p => (
                                <tr key={p.id}>
                                    <td>
                                        <ProductImage 
                                            imageUrl={p.imageUrl}
                                            imagePath={p.imagePath}
                                            alt={p.title}
                                            className="adminp__thumb"
                                        />
                                    </td>
                                    <td>{p.id}</td>
                                    <td>{p.title}</td>
                                    <td>${p.price.toFixed(2)}</td>
                                    <td>{p.category}</td>
                                    <td>{p.featured ? "✓" : ""}</td>
                                    <td>{p.discount ? `${Math.round(p.discount * 100)}%` : ""}</td>
                                    <td className='adminp__row-actions'>
                                        <button onClick={() => startEdit(p)}>Edit</button>
                                        <button onClick={() => remove(p.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {view.length === 0 && (
                                <tr>
                                    <td colSpan={8} style={{opacity:.7, textAlign: "center"}}>No product found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AdminProducts;