
import React from 'react';
import '../assets/styles/Cart.css';
import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { addToCart } from '../api/addToCart';
import { deleteFromCart } from '../api/deleteFromCart';
export default function CartItem({ item }) {
    const { products, setProducts } = useContext(ProductsContext);
    const handleDecrease = () => {
        const localProducts = products.map(product => {
            if (product._id === item._id && product.cart.isExist && product.cart.quantity > 0) {
                const newQuantity = product.cart.quantity - 1;

                if (newQuantity === 0) {
                    deleteFromCart(item._id, 1, sessionStorage.getItem('userID'));
                    return {
                        ...product,
                        cart: {
                            ...product.cart,
                            quantity: newQuantity,
                            isExist: false
                        },
                        newQuantity
                    };
                } else {
                    deleteFromCart(item._id, 1, sessionStorage.getItem('userID'));
                    return {
                        ...product,
                        cart: {
                            ...product.cart,
                            quantity: newQuantity
                        },
                        newQuantity
                    };
                }
            }
            return product;
        });

        setProducts(localProducts);
    };

    const handleIncrease = () => {
        const localProducts = products.map(product => {
            if (product._id === item._id && product.cart.isExist && product.cart.quantity < product.numOfProduct) {
                const newQuantity = product.cart.quantity + 1;


                addToCart(item._id, newQuantity, sessionStorage.getItem('userID'));

                return {
                    ...product,
                    cart: {
                        ...product.cart,
                        quantity: newQuantity
                    }
                };
            }
            return product;
        });

        setProducts(localProducts);
    };



    if (!item) return;
    return (
        <div className="cart-item">
            <img src={item.productImg} alt={item.name} />

            <div className="cart-item-details">
                <h3>{item.productName}</h3>
                <p>{item.price} EGP</p>

                <div className="quantity-controls">
                    <button className="qty-btn" onClick={() => handleDecrease(item._id)}>–</button>
                    <span className="qty">{item.cart.quantity}</span>
                    <button className="qty-btn" onClick={handleIncrease}>+</button>
                </div>
            </div>
        </div>
    );
}