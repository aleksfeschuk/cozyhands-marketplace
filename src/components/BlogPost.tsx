import { useParams, Link } from "react-router-dom";
import { useBlogPost } from "../context/hooks/useBlogPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

const BlogPost: React.FC = () => {
    const { slug } = useParams<{slug: string }>();
    const { item: post, loading } = useBlogPost(slug);

    if (loading) return <div className="container">Loading...</div>;
    if (!post) return <div className="container">Post not found</div>;

    return (
        <section className="blog">
            <div className="container blog__container">
                <nav className="blog__back">
                    <Link to="/blog" className="blog__back-link">← Back to all posts</Link>
                </nav>

                <article className="blog__article">
                    <header className="blog__header">
                        <h1 className="blog__title">{post.title}</h1>
                        <div className="blog__meta">
                            <span>{toDateStr(post.createdAt)}</span>
                            {post.tags?.length ? <span> · {post.tags.join(", ")}</span> : null}
                        </div>
                    </header>

                    {post.coverImage && (
                        <div className="blog__cover">
                            <img src={post.coverImage} alt={post.title} />
                        </div>
                    )}

                    <div className="blog__content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </article>
            </div>
        </section>
    )
}

export default BlogPost;