import { ProductsContext } from "./ProductsContext";
import { useState } from "react";
export default function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductsContext.Provider>
    );
}