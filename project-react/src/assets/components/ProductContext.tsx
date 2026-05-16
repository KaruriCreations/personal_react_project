import { createContext, ReactNode } from "react";
import useFetch from "../../hooks/useFetch";

const productContext = createContext<any>({});

export const ProductProvider = ({children}: {children: ReactNode}) => {
    const productData = useFetch("http://localhost:5000/electronics");

    return (
        <productContext.Provider value={productData}>
            {children}
        </productContext.Provider>
    );
}

export default productContext;