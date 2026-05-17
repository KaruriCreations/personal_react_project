import useFetch from "../../hooks/useFetch";
import NavBar from "../components/NavBar";
import productContext from "../components/ProductContext";
import { useContext, useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

export default function ProductPage(){
    //destructuring the productContext as recommended by TM
    const {data, loading, error} = useContext(productContext);
    //using useState to manage the filteredProducts state
    const [filteredProducts, setFilteredProducts] = useState([]);

    //using useEffect to update the filteredProducts state when data is available
    useEffect(() => {
        if (data) {
            setFilteredProducts(data);
        }
    }, [data]);
    //handling the loading state
    if(loading) return <h1>Loading...</h1>;
    //handling the error state
    if(error) return <h1>Error: {error.message || String(error)}</h1>;
    //handling the no data state
    if(!data) return <h1>No data available</h1>;

    return (
        <>
        <NavBar />
        {/* passing the data to the search bar component */}
        <SearchBar fetchedProducts={data} setFilteredProducts={setFilteredProducts} />
        <div className="product-grid">
            {/* // if data is present, map through data and display the products to ProductCard components */}
            {filteredProducts.map((product) => (
                <ProductCard key={product.id} id={product.id} name={product.name} description={product.description} price={product.price} />  
            ))}
        </div>
        </>
    );
}