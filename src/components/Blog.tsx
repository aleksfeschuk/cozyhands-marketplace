import { Link } from "react-router-dom";
import { useBlogPosts } from "../context/hooks/useBlogPosts";
import type { Timestamp } from "firebase/firestore";

function toDateStr(v?: Timestamp | Date | null) {
    let d: Date | null = null;
    if (!v) d = null;
    else if (v instanceof Date) d = v;
    else if (typeof (v as Timestamp).toDate === "function") d = (v as Timestamp).toDate();
    return d
        ? d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
        : "";
}


const Blog: React.FC = () => {
    
    const { items, loading } = useBlogPosts();

    // lists posts
    return (
        <section className="blog">
            <div className="container blog__container">
                <header className="blog__intro">
                    <h1 className="blog__heading">From the Cozyhands Blog</h1>
                    <p className="blog__sub">
                        Notes from fairs, material choices, and the little rituals behind handmade pieces.
                    </p>
                </header>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="blog__grid">
                    {items.map((p) => (
                        <article key={p.id} className='blog__card'>
                            <div className="blog__card-body">
                                <h2 className="blog__card-title">
                                    <Link
                                        to={`/blog/${p.slug}`} className='blog__card-link'
                                    >{p.title}</Link>
                                </h2>
                                <div className="blog__card-meta">
                                    <span>{toDateStr(p.createdAt)}</span><span> · </span>
                                    <span>{p.tags?.join(", ")}</span>
                                </div>
                                <p className="blog__card-excerpt">{p.excerpt}</p>
                                <div className="blog__card-actions">
                                    <Link to={`/blog/${p.slug}`} className="blog__readmore">Read more →</Link>
                                </div>
                            </div>
                        </article>
                    ))}
                    {items.length === 0 && <p>No posts yet.</p>}
                </div>
                )}
            </div>
        </section>
    )
}

export default Blog;