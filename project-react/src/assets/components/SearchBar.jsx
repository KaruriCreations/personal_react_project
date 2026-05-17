import { useState } from "react";

export default function SearchBar({ fetchedProducts, setFilteredProducts }){
    //using useState to manage the searchTerm state
    const [searchTerm, setSearchTerm] = useState("");

    //handling the search function to allow users to search for products
    const handleSearch = () => {
        //filtering the products based on the search term
        const filteredProducts = fetchedProducts.filter((product) =>
            //returns true if the product name includes the search term
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        //updating the filteredProducts state
        setFilteredProducts(filteredProducts);
    }
        
    return (
        //rendering the search bar
        <div className="search-container">
            <div>
                <label htmlFor="search">Search</label>
                <input type="text" id="search" name="search" placeholder="Search products..." onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <button type="submit" onClick={handleSearch}>Search</button>
        </div>  
    )
        
}