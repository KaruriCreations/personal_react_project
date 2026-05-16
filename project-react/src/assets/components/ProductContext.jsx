import { createContext } from "react";
import useFetch from "../../hooks/useFetch";

const productContext = createContext({});

export const ProductProvider = ({children}) => {
    const productData = useFetch("http://localhost:5000/electronics");

    return (
        <productContext.Provider value={productData}>
            {children}
        </productContext.Provider>
    );
}

export default productContext;