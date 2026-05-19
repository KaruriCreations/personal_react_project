import { createContext } from "react";
import useFetch from "../../hooks/useFetch";

const productContext = createContext({}); // created my context here

export const ProductProvider = ({children}) => {
    // fetching products from the backend using my custom hook useFetch
    // now also exposes refetch so any child can trigger a data reload after CRUD ops
    const productData = useFetch("http://localhost:5000/electronics");

    return (
        // providing the product data to the children (includes data, setData, loading, error, refetch)
        <productContext.Provider value={productData}>
            {children}
        </productContext.Provider>
    );
}

export default productContext;