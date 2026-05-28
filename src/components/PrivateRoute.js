import { Navigate } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import { fetchProducts } from "../api/fetchProducts";
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getUser } from "../api/getUser";
const PrivateRoute = ({ children }) => {
    const { setProducts } = useContext(ProductsContext);

    const isAuthenticated = !!sessionStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuth = async () => {
            if (sessionStorage.getItem('role') === 'admin') {
                getAdminProducts(setProducts);
                navigate('/admin');
            } else {
                const user = await getUser();
                getUserProducts(user.favorites, user.cart, setProducts);
            }
        }
        if (isAuthenticated) handleAuth();
    }, []);

    return isAuthenticated ? children : <Navigate to="/login" />;
};
const getAdminProducts = async (setProducts) => {
    const products = await fetchProducts();
    if (!products || products.length === 0) {
        return;
    }
    setProducts(products);
}


const getUserProducts = async (fav, cart, setProducts) => {
    const products = await fetchProducts();
    // Check if the product in cart of user is exist or not & favorite or no
    if (!products || products.length === 0) {
        return;
    }
    console.log(cart)
    products.forEach(product => {
        if (cart.length > 0) {
            cart.forEach(cartItem => {
                if (cartItem._id === product._id && product.numOfProduct >= cartItem.quantity) {
                    product.cart = {
                        isExist: true,
                        quantity: cartItem.quantity
                    }
                } else {
                    product.cart = {
                        isExist: false,
                        quantity: 0
                    }
                }
            })
        } else {
            product.cart = {
                isExist: false,
                quantity: 0
            }
        }
        if (fav.includes(product._id) && product.numOfProduct > 0) {
            product.isFavorite = true;
        }
        else product.isFavorite = false;
    });

    setProducts(products);
}

export default PrivateRoute;
