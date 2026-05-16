import { useState } from "react";

interface SearchBarProps {
    fetchedProducts: any[];
    setFilteredProducts: (products: any[]) => void;
}

export default function SearchBar({ fetchedProducts, setFilteredProducts }: SearchBarProps){
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        const filteredProducts = fetchedProducts.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filteredProducts);
    }
        
    return (
        <div>
            <label htmlFor="search">Search</label>
            <input type="text" id="search" name="search" placeholder="Search products..." onChange={(e) => setSearchTerm(e.target.value)} />
            <button type="submit" onClick={handleSearch}>Search</button>
        </div>  
    )
        
}