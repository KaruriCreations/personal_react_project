import useFetch from "../../hooks/useFetch";
import NavBar from "../components/NavBar";
import productContext from "../components/ProductContext";
import { useContext } from "react";
import ProductCard from "../components/ProductCard";

export default function ProductPage(){
const {data, loading, error} = useContext(productContext);
    if(loading) return <h1>Loading...</h1>;
    if(error) return <h1>Error: {(error as any).message || String(error)}</h1>;
    if(!data) return <h1>No data available</h1>;

    return (
        <>
        <NavBar />
        <div>
            {(data as any[]).map((product) => (
                <ProductCard key={product.id} name={product.name} description={product.description} price={product.price} />  
            ))}
        </div>
        </>
    );
}