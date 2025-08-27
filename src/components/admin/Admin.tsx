import { useState } from 'react';
import AdminProducts from './AdminProducts';


const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"products" | "blog">("products");

    return (
        <section className="admin">
            <div className='container admin__container'>
                <h1 className='admin__title'>Admin Panel</h1>

                <div className='admin__tabs'>
                    <button
                        className={`admin__tab ${activeTab === "products" ? "is-active" : ""}`}
                        onClick={() => setActiveTab("products")}
                    >
                        Products
                    </button>

                    <button
                        className={`admin__tab ${activeTab === "blog" ? "is-active" : ""}`}
                        onClick={() => setActiveTab("blog")}
                        disabled
                        title="Coming soon"
                    >
                        Blog (soon)
                    </button>
                </div>

                <div className="admin__content">
                    {activeTab === "products" ? <AdminProducts /> : <div>Blog editor coming soon</div>}
                </div>
            </div>
        </section>
    )
}

export default Admin;