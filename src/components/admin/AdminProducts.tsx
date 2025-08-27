import { useEffect, useMemo, useState } from 'react';
import type { Product } from '../../types/index';
import { mockProducts } from '../../data/products';

const deepCopy = <T,>(v:T): T => JSON.parse(JSON.stringify(v));

// product control panel

const AdminProducts: React.FC = () => {
    const [list, setList] = useState<Product[]>(() => {
        try {
            const saved = localStorage.getItem("admin:products");
            return saved ? JSON.parse(saved) : deepCopy(mockProducts);
        } catch {
            return deepCopy(mockProducts);
        }
    });

    // Edit/add form

    const empty: Product = {
        id: "",
        title: "",
        price: 0,
        category: "",
        description: "",
        imageUrl: "",
        featured: false,
        discount: 0
    };

    const [draft, setDraft] = useState<Product>(empty);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [q, setQ] = useState("");
    const [cat, setCat] = useState("all");

    type SortOption = "new" | "price-asc" | "price-desc"
    const [sort, setSort] = useState<SortOption>("new");

    useEffect(() => {
        localStorage.setItem("admin:products", JSON.stringify(list))
    }, [list]);

    const syncToMock = (next: Product[]) => {
        mockProducts.length = 0;
        mockProducts.push(...deepCopy(next));
        setList(next);
    };

    // Categories are dynamically extracted from the list (for filtering)

    const categories = useMemo(() => {
        const set = new Set(
            list
            .map(p => p.category)
            .filter(Boolean));
        return ["all", ...Array.from(set).sort()];
    }, [list]);


    // filter and sort list
    const view = useMemo(() => {
        let cur = list.filter(p => 
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
    }, [list, q, cat, sort]);


    // CRUD active

    const startCreate = () => {
        setEditingId(null);
        setDraft(empty);
    };

    const startEdit = (p: Product) => {
        setEditingId(p.id);
        setDraft(deepCopy(p));
    };

    const cancel = () => {
        setEditingId(null);
        setDraft(empty);
    };

    const save = () => {
        if (!draft.id.trim()) return alert ("ID is required");
        if (!draft.title.trim()) return alert("Title is required");
        if (!draft.category.trim()) return alert("Category is required");
        if (draft.price <= 0) return alert("Price must be > 0");
        
        const exists = list.some(p => p.id === draft.id);
        const next = exists
            ? list.map(p => p.id === draft.id ? deepCopy(draft) : p)
            : [deepCopy(draft), ...list];
        syncToMock(next);
        cancel();
    };

    const remove = (id: string) => {
        if (!confirm("Delete this product")) return;
        const next = list.filter(p => p.id !== id);
        syncToMock(next);
    };

    const resetToMock = () => {
        if (!confirm("Reset to original mockProducts?")) return;   
        const next = deepCopy(mockProducts);
        setList(next);

        localStorage.setItem("admin: products", JSON.stringify(next));
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
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <select className='adminp__select' value={sort} onChange={e => setSort(e.target.value as SortOption)}>
                    <option value="new">Sort: New</option>
                    <option value="price-asc">Sort: Price ↑</option>
                    <option value="price-desc">Sort: Price ↓</option>
                </select>

                <div className="adminp__spacer">
                    <button className="btn" onClick={startCreate}> + New product</button>
                    <button className="btn btn--guest" onClick={resetToMock}>Reset</button>
                </div>
            </div>

            {/* Form create/edit */}

            <div className='adminp__form'>
                <h3 className='adminp__form-title'>
                    {editingId ? `Edit: ${editingId}` : "Create product"}
                </h3>

                <div className="adminp__grid">
                    <input 
                        placeholder="ID unique"
                        value={draft.id}
                        onChange={e => setDraft({...draft, id: e.target.value })}
                    />
                    <input 
                        placeholder='Title'
                        value={draft.title}
                        onChange={e => setDraft({...draft, title: e.target.value})}
                    />
                    <input 
                        placeholder='Category'
                        value={draft.category}
                        onChange={e => setDraft({...draft, category: e.target.value})}
                    />
                    <input 
                        placeholder="Image URL"
                        value={draft.imageUrl}
                        onChange={e => setDraft({...draft, imageUrl: e.target.value})}
                    />
                    <input 
                        placeholder='Description'
                        value={draft.description}
                        onChange={e => setDraft({...draft, description: e.target.value})}
                    />

                    {/* featured */}

                    <label className="adminp__check">
                        <input 
                            type="checkbox"
                            checked={!!draft.featured}
                            onChange={e => setDraft({ ...draft, featured: e.target.checked })}
                        />
                        Featured
                    </label>

                    {/* discount */}

                    <input 
                        type="number"
                        value={draft.price ?? 0}
                        onChange={e => setDraft({...draft, price: parseFloat(e.target.value) || 0 })}
                    />
                </div>

                <div className='adminp__actions'>
                    <button className='btn' onClick={save}>Save</button>
                    <button className='btn btn--guest' onClick={cancel}>Cancel</button>
                </div>

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
                                    {p.imageUrl
                                        ? <img 
                                            src={p.imageUrl}
                                            alt={p.title}
                                            style={{width: 72, height: 48, objectFit: "cover", borderRadius: 6}}
                                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display="none";}}
                                        />
                                        : <span style={{opacity: .5}}>no image</span>
                                    }
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
            </div>
        </div>
    );
};

export default AdminProducts;
