import LoginForm from "../components/LoginForm";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import productContext from "../components/ProductContext";
import { useContext, useState } from "react";
import ProductForm from "../components/ProductForm";

export default function AdminPage(){
    // destructuring the productContext as recommended by TM
    const { data, loading, error } = useContext(productContext); 
    
    const [editingProduct, setEditingProduct] = useState(null);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [saveMsg, setSaveMsg] = useState("");

    //handling the edit function to allow admin to edit products
    function handleEdit(id) {
        //finds specific product by id to be edited
        const product = data.find((p) => p.id === id);
        //if product found set the editingProduct state and the editName, editDescription, and editPrice states
        if (product) {
            setEditingProduct(product);
            setEditName(product.name);
            setEditDescription(product.description);
            setEditPrice(String(product.price));
            setSaveMsg("");
        }
    }
    
    //handling the save function to allow admin to save edited products
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
                setSaveMsg("Product updated! Refresh to see changes.");
                setEditingProduct(null);
            } else {
                setSaveMsg("Failed to update product.");
            }
        } catch (err) {
            setSaveMsg("An error occurred.");
        }
    }

    return (
        <div>
            <NavBar />
            <h1 style={{color:"red", fontFamily:"'Courier New', monospace"}}>Admin Page</h1>
            {/*login form*/}
            <LoginForm />
            {/* for admin to add new products to the store*/}
            <h2>Add New Product</h2>
            <ProductForm />


            <hr />
            <h2>All Products</h2>
           {/*if loading true display loading... for our products*/}
           
            {loading && <p>Loading products...</p>}
            {/* if error true display error message for our products*/}
            {error && <p style={{color:"red"}}>Error loading products</p>}

        {/* if editing product true display the edit form*/}
            {editingProduct && (
                <div style={{border:"2px solid #007bff", padding:"16px", margin:"12px 0", borderRadius:"8px", background:"#f0f8ff"}}>
                    <h3 style={{color:"black"}}>Editing: {editingProduct.name}</h3>
                    <label style={{color:"black"}}>Name<br />
                        <input value={editName} onChange={e => setEditName(e.target.value)} style={{width:"100%", marginBottom:"8px"}} />
                    </label>
                    <label style={{color:"black"}}>Description<br />
                        <input value={editDescription} onChange={e => setEditDescription(e.target.value)} style={{width:"100%", marginBottom:"8px"}} />
                    </label>
                    <label style={{color:"black"}}>Price (KSH)<br />
                        <input value={editPrice} onChange={e => setEditPrice(e.target.value)} style={{width:"100%", marginBottom:"8px"}} />
                    </label>
                    <button onClick={handleSave} style={{marginRight:"8px"}}>💾 Save</button>
                    <button onClick={() => setEditingProduct(null)}>✖ Cancel</button>
                    {saveMsg && <p>{saveMsg}</p>}
                </div>
            )}

            <div style={{display:"flex", flexWrap:"wrap"}}>
                {/* // if data is present, map through data and display the products to ProductCard components */}
                {data?.map((product) => (
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