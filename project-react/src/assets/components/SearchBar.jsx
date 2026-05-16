import { useState } from "react";

export default function SearchBar({ fetchedProducts, setFilteredProducts }){
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        const filteredProducts = fetchedProducts.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filteredProducts);
    }
        
    return (
        <div className="search-container">
            <div>
                <label htmlFor="search">Search</label>
                <input type="text" id="search" name="search" placeholder="Search products..." onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <button type="submit" onClick={handleSearch}>Search</button>
        </div>  
    )
        
}