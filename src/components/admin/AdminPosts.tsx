import { useMemo, useState } from "react";
import { useBlogPosts } from "../../context/hooks/useBlogPosts";

import {
    addPost,
    updatePost,
    deletePost,
    type PostWrite,
} from "../../data/postApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../../styles/Admin.scss";

type Draft = PostWrite & { id?: string };

const empty: Draft = {
    title: "",
    slug: "",
    coverImage: "",
    excerpt: "",
    content: "",
    tags: [],
};

function slugify(s: string) {
    return s
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const AdminPosts: React.FC = () => {
    const {items, loading} = useBlogPosts();
    const [draft, setDraft] = useState<Draft>(empty);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [error, setError] = useState("");

    const startCreate = () => {
        setEditingId(null);
        setDraft(empty);
        setError("");
    };

    const startEdit = (id: string) => {
        const p = items.find((x) => x.id === id);
        if (!p) return;
        setEditingId(id);
        setDraft({
            id,
            title: p.title,
            slug: p.slug,
            coverImage: p.coverImage || "",
            excerpt: p.excerpt || "",
            content: p.content || "",
            tags: p.tags || [],
        });
        setError("");
    };

    const cancel = () => {
        setEditingId(null);
        setDraft(empty);
        setError("");
    };

    const save = async () => {
        setError("");

        const payload: PostWrite = {
            title: draft.title.trim(),
            slug: draft.slug.trim() || slugify(draft.title),
            coverImage: draft.coverImage.trim(),
            excerpt: draft.excerpt.trim(),
            content: draft.content,
            tags: (draft.tags || []).map((t) => t.trim()).filter(Boolean),
        };

        if (!payload.title) return setError("Title is required");
        if (!payload.slug) return setError("Slug is required");
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(payload.slug))
        return setError("Slug may contain a–z, 0–9 and hyphens only");
        if (!payload.content.trim()) return setError("Content is required");
    

        try {
            if (editingId) await updatePost(editingId, payload);
            else await addPost(payload);
            cancel();
        } catch (e) {
            const msg = e instanceof Error ? e.message : "Failed to save post";
            setError(msg);
        }
    };


    const remove = async (id: string) => {
        if (!confirm("Delete this post?")) return;
        try {
            await deletePost(id);
        } catch (e) {
            alert (e instanceof Error ? e.message : "Failed to delete");
        }
    };

    const tagsInput = useMemo(() => (draft.tags || []).join(", "), [draft.tags]);

    return (
        <div className="adminp">
        <div className="admin__toolbar">
            <button className="btn" onClick={startCreate}>+ New post</button>
        </div>

        <div className="adminp__form">
            <h3 className="adminp__form-title">
                {editingId ? `Edit post` : "Create post"}
            </h3>

            {error && <div style={{ color: "#b00020", marginBottom: 12 }}>{error}</div>}

            <div className="adminp__grid">
            <input
                placeholder="Title"
                value={draft.title}
                onChange={(e) =>
                setDraft((d) => ({ ...d, title: e.target.value, slug: d.slug || slugify(e.target.value) }))
                }
            />
            <input
                placeholder="Slug (a-z-0-9)"
                value={draft.slug}
                onChange={(e) => setDraft({ ...draft, slug: slugify(e.target.value) })}
            />
            <input
                placeholder="Cover image URL"
                value={draft.coverImage}
                onChange={(e) => setDraft({ ...draft, coverImage: e.target.value })}
            />
            <input
                placeholder="Excerpt"
                value={draft.excerpt}
                onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
            />
            <input
                placeholder="Tags (comma-separated)"
                value={tagsInput}
                onChange={(e) =>
                setDraft({ ...draft, tags: e.target.value.split(",").map((s) => s.trim()) })
                }
            />

            <textarea
                placeholder="Write content in **Markdown** (supports tables, lists, links)"
                rows={10}
                value={draft.content}
                onChange={(e) => setDraft({ ...draft, content: e.target.value })}
            />

            <div className="adminp__preview">
                <div className="adminp__preview-title">Preview</div>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {draft.content || "_Nothing to preview_"}
                </ReactMarkdown>
            </div>
            </div>

            <div className="adminp__actions">
            <button className="btn" onClick={save}>Save</button>
            <button className="btn btn--ghost" onClick={cancel}>Cancel</button>
            </div>
        </div>

        {loading ? (
            <p style={{ opacity: 0.7 }}>Loading…</p>
        ) : (
            <table className="adminp__table">
            <thead>
                <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Tags</th>
                <th style={{ width: 140 }}></th>
                </tr>
            </thead>
            <tbody>
                {items.map((p) => (
                <tr key={p.id}>
                    <td>{p.title}</td>
                    <td>{p.slug}</td>
                    <td>{p.tags?.join(", ")}</td>
                    <td className="adminp__row-actions">
                    <button onClick={() => startEdit(p.id)}>Edit</button>
                    <button onClick={() => remove(p.id)}>Delete</button>
                    </td>
                </tr>
                ))}
                {items.length === 0 && (
                <tr>
                    <td colSpan={4} style={{ textAlign: "center", opacity: 0.7 }}>
                    No posts yet
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        )}
        </div>
  );
}

export default AdminPosts;