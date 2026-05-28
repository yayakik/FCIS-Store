import { CartContext } from "./CartContext";
import { useState } from "react";
export default function ProductsProvider({ children }) {
    const [cart, setCart] = useState([]);
    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
}