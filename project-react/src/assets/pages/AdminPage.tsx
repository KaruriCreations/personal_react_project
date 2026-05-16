import LoginForm from "../components/LoginForm";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import productContext from "../components/ProductContext";
import { useContext, useState } from "react";

type Product = {
    id: string | number;
    name: string;
    description: string;
    price: number | string;
    origin?: string;
}

export default function AdminPage(){
    const { data, loading, error } = useContext(productContext);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [saveMsg, setSaveMsg] = useState("");

    function handleEdit(id: string | number) {
        const product = (data as Product[]).find((p) => p.id === id);
        if (product) {
            setEditingProduct(product);
            setEditName(product.name);
            setEditDescription(product.description);
            setEditPrice(String(product.price));
            setSaveMsg("");
        }
    }

    async function handleSave() {
        if (!editingProduct) return;
        try {
            const response = await fetch(`http://localhost:5000/electronics/${editingProduct.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: editName,
                    description: editDescription,
                    price: editPrice,
                })
            });
            if (response.ok) {
                setSaveMsg("✅ Product updated! Refresh to see changes.");
                setEditingProduct(null);
            } else {
                setSaveMsg("❌ Failed to update product.");
            }
        } catch (err) {
            setSaveMsg("❌ An error occurred.");
        }
    }

    return (
        <div>
            <NavBar />
            <h1>Admin Page</h1>
            <LoginForm />
            <Outlet />

            <hr />
            <h2>All Products</h2>

            {loading && <p>Loading products...</p>}
            {error && <p style={{color:"red"}}>Error loading products</p>}

            {editingProduct && (
                <div style={{border:"2px solid #007bff", padding:"16px", margin:"12px 0", borderRadius:"8px", background:"#f0f8ff"}}>
                    <h3>Editing: {editingProduct.name}</h3>
                    <label>Name<br />
                        <input value={editName} onChange={e => setEditName(e.target.value)} style={{width:"100%", marginBottom:"8px"}} />
                    </label>
                    <label>Description<br />
                        <input value={editDescription} onChange={e => setEditDescription(e.target.value)} style={{width:"100%", marginBottom:"8px"}} />
                    </label>
                    <label>Price (KSH)<br />
                        <input value={editPrice} onChange={e => setEditPrice(e.target.value)} style={{width:"100%", marginBottom:"8px"}} />
                    </label>
                    <button onClick={handleSave} style={{marginRight:"8px"}}>💾 Save</button>
                    <button onClick={() => setEditingProduct(null)}>✖ Cancel</button>
                    {saveMsg && <p>{saveMsg}</p>}
                </div>
            )}

            <div style={{display:"flex", flexWrap:"wrap"}}>
                {data && (data as Product[]).map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
        </div>
    );
}