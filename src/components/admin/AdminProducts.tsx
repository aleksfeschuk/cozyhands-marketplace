import { useMemo, useState } from 'react';
import type { Product } from '../../types/index';
import { useProducts } from "../../context/hooks/useProducts"; 
import { addProduct, updateProduct, deleteProduct,
    type ProductWrite,
 } from '../../data/productsApi';


type DraftProduct = Omit<Product, "id" | "createdAt" | "updatedAt"> & { id?: string };
 
    // Edit/add form

    const emptyDraft: DraftProduct = {
        title: "",
        price: 0,
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

    

    // Categories are dynamically extracted from the list (for filtering)

    const categories = useMemo(() => {
        const set = new Set(
            items.map(p => p.category)
            .filter(Boolean));
        return ["all", ...Array.from(set).sort()];
    }, [items]);


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
    };

    const startEdit = (p: Product) => {
        setEditingId(p.id);
        setDraft({
            title: p.title ?? "",
            price: p.price ?? 0,
            category: p.category ?? "",
            description: p.description ?? "",
            imageUrl: p.imageUrl ?? "",
            featured: !!p.featured,
            discount: p.discount ?? 0,
        });
    };

    const cancel = () => {
        setEditingId(null);
        setDraft(emptyDraft);
    };

    const save = async () => {
        if (!draft.title.trim()) return alert("Title is required");
        if (!draft.category.trim()) return alert("Category is required");
        if (draft.price <= 0) return alert("Price must be > 0");
        if (draft.discount !== null) {
            const d = Number(draft.discount);
            if (Number.isNaN(d) || d < 0 || d > 1) return alert("Discount must be 0..1");
        } 


        const payload: ProductWrite = {
            title: draft.title.trim(),
            price: Number(draft.price),
            category: draft.category.trim(),
            description: draft.description.trim(),
            imageUrl: draft.imageUrl.trim(),
            featured: !!draft.featured,
            discount: Number(draft.discount) || 0,
        };

        try {
            if (editingId) {
                //update
                await updateProduct(editingId, payload)
            } else {
                await addProduct(payload)
            }
            cancel()
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : "Failed to save product";
            alert(msg);
        }
    }



    const remove = async (id: string) => {
        if (!confirm("Delete this product")) return;
        try {
            await deleteProduct(id);
        } catch (e) {
            const msg = e instanceof Error ? e.message : "Failed to save product";
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

                <div className="adminp__grid">
                    
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

                    {/* price */}

                    <input 
                        type="number"
                        step="0.01"
                        min={0.01}
                        placeholder='Price'
                        value={draft.price ?? 0}
                        onChange={e => setDraft({...draft, price: parseFloat(e.target.value) || 0 })}
                    />

                    {/* discount */}
                    <input 
                        type="number"
                        step="0.01"
                        min={0}
                        max={1}
                        placeholder='Discount (0..1)'
                        value={draft.discount ?? 0}
                        onChange={(e) => 
                            setDraft({
                                ...draft,
                                discount: Math.max(0, Math.min(1, parseFloat(e.target.value) || 0)),
                            })
                        }/>
                </div>

                <div className='adminp__actions'>
                    <button className='btn' onClick={save}>Save</button>
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
                )}
            </div>
        </div>
    );
}

export default AdminProducts;
