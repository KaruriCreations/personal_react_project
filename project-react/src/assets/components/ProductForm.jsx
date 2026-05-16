import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductForm(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

      const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMsg("");
        try{
            const response = await fetch("http://localhost:5000/electronics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    description,
                    price
                })
            });
            if(response.ok){
                console.log("Product added successfully!");
                navigate("/admin/product-form");
            }
        }catch(error){
            console.log(error);
            setErrorMsg("An error occurred during product addition.");
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Product Name</label>
            <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} />
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" onChange={(e) => setDescription(e.target.value)} />
            <label htmlFor="price">Price</label>
            <input type="text" id="price" name="price" onChange={(e) => setPrice(e.target.value)} />
            <button type="submit">Add Product</button>  
        </form>
    );
}