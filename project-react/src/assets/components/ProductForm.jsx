import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductForm(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    // handling the submission of the product form
      const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMsg("");
        try{
            const response = await fetch("http://localhost:5000/electronics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name,
                    description,
                    price
                })
            });
            // if the response is ok, alert the user that the product was added successfully and navigate to the admin page
            if(response.ok){
                window.alert("Product added successfully!");
                navigate("/admin/product-form");
            }
        }catch(error){
            console.log(error);
            window.alert("An error occurred during product addition.");
        }
    }
    
    return (
        //rendering the product form
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Product Name</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <label htmlFor="price">Price</label>
            <input type="text" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <button type="submit">Add Product</button>  
        </form>
    );
}