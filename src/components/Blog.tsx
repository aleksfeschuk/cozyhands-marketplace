import React, { useMemo } from 'react';
import { Link, useSearchParams } from "react-router-dom";

const posts = [
  {
    id: "craft-fair-journey",
    title: "Our Craft Fair Journey: From Small Booths to Big Smiles",
    date: "2025-08-10",
    author: "CozyHands Team",
    tags: ["events", "community", "handmade"],
    excerpt:
      "How we grew from a tiny stall to a bustling booth — and what we learned about people, patience, and the magic of handmade.",
    content: [
      "Handmade is slow by design. It’s the kind of slow that lets you breathe, notice details, and appreciate texture. When we first set up a tiny booth at a local craft fair, it felt like stepping into a living gallery of patience and passion.",
      "We learned quickly that people don’t just buy objects — they collect stories. They ask where the wool came from, how the wax is poured, whether the bag will carry their daily chaos with grace. Every answer deepens the bond.",
      "Our small rituals became our edge: hand-written tags, a warm greeting, letting folks touch textures. None of these scale brilliantly, and that’s the point — they’re human, warm, and sincere.",
      "If you're starting out, start smaller than you think. Keep your display tight, tell a single story, and let your materials do the talking. Growth follows clarity.",
      "Next season, we’re planning monthly micro-events: mini demonstrations, scent tests for candles, and short sessions on caring for wool. If you’re nearby, come say hi — we’ll keep the kettle warm."
    ],
  },
  {
    id: "materials-matter",
    title: "Materials Matter: Why Wool, Cotton, and Soy Wax",
    date: "2025-07-28",
    author: "Lena from CozyHands",
    tags: ["materials", "process", "sustainability"],
    excerpt:
      "We choose humble materials with care: wool for warmth and longevity, cotton for softness and breathability, and soy wax for a gentler glow.",
    content: [
      "Wool is a small miracle: it warms when damp, resists odors, and ages with character. Cotton comes next — familiar, gentle, and endlessly adaptable. Soy wax? It’s our favorite for a soft, steady light without overwhelming fragrance.",
      "Good pieces invite care, not fear. They don’t feel fragile; they feel alive. That’s why we keep our palette modest and our finishes honest.",
      "We’ll keep sharing more about sourcing and care — what to expect, how to wash, and how to repair. Objects you can maintain are objects you can love for years."
    ],
  },
];

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

const Blog: React.FC = () => {
    const [sp] = useSearchParams();
    const activeId = sp.get("id");

    const activePost = useMemo(
        () => (activeId ? posts.find((p) => p.id === activeId) : null),
        [activeId]
    );

    if (activePost) {
        return (
            <section className="blog">
                <div className="container blog__container">
                    <nav className="blog__back">
                        <Link
                            to="/blog" className="blog__back-link"
                        > ← Back to all posts</Link>
                    </nav>

                    <article className='blog__article'>
                        <header className="blog__header">
                            <h1 className="blog__title">{activePost.title}</h1>
                            <div className="blog__meta">
                                <span>{formatDate(activePost.date)}</span>
                                <span>.</span>
                                <span>{activePost.author}</span>
                            </div>
                            {activePost.tags?.length > 0 && (
                                <ul className='blog__tags'>
                                    {activePost.tags.map((t) => <li key={t}>#{t}</li>)}
                                </ul>
                            )}
                        </header>

                        <div className="blog__content">
                            {activePost.content.map((para, i) => (
                                <p key={i} className="blog__p">{para}</p>
                            ))}
                        </div>

                        <footer className="blog__footer">
                            <Link
                                to="/shop" className="blog__cta">
                                    Browse the collection
                            </Link>
                        </footer>
                    </article>
                </div>
            </section>
        )
    }

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

                <div className="blog__grid">
                    {posts.map((p) => (
                        <article key={p.id} className='blog__card'>
                            <div className="blog__card-body">
                                <h2 className="blog__card-title">
                                    <Link
                                        to={`/blog?id=${p.id}`} className='blog__card-link'
                                    >{p.title}</Link>
                                </h2>
                                <div className="blog__card-meta">
                                    <span>{formatDate(p.date)}</span>
                                    <span>.</span>
                                    <span>{p.author}</span>
                                </div>
                                <p className="blog__card-excerpt">{p.excerpt}</p>
                                <div className="blog__card-actions">
                                    <Link to={`/blog?id=${p.id}`} className="blog__readmore">Read more →</Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Blog;