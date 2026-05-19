import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import productContext from "./ProductContext";

export default function ProductForm(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const { refetch } = useContext(productContext);

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
            // if the response is ok, refetch the product list so the UI updates immediately
            if(response.ok){
                // clear form fields
                setName("");
                setDescription("");
                setPrice("");
                // refetch products so context updates everywhere
                refetch();
                window.alert("Product added successfully!");
            } else {
                setErrorMsg("Failed to add product.");
            }
        }catch(error){
            console.log(error);
            setErrorMsg("An error occurred during product addition.");
            window.alert("An error occurred during product addition.");
        }
    }
    
    return (
        //rendering the product form
        <form onSubmit={handleSubmit}>
            {errorMsg && <p style={{color: "red"}}>{errorMsg}</p>}
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