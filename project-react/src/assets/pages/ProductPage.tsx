import useFetch from "../../hooks/useFetch";
import NavBar from "../components/NavBar";
import productContext from "../components/ProductContext";
import { useContext, useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

export default function ProductPage(){
const {data, loading, error} = useContext(productContext);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            setFilteredProducts(data as any[]);
        }
    }, [data]);
    if(loading) return <h1>Loading...</h1>;
    if(error) return <h1>Error: {(error as any).message || String(error)}</h1>;
    if(!data) return <h1>No data available</h1>;

    return (
        <>
        <NavBar />
        <SearchBar fetchedProducts={data as any[]} setFilteredProducts={setFilteredProducts} />
        <div>
            {filteredProducts.map((product) => (
                <ProductCard key={product.id} id={product.id} name={product.name} description={product.description} price={product.price} />  
            ))}
        </div>
        </>
    );
}