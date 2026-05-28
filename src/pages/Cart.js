import React from 'react';
import { useContext, useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import { Button } from '@mui/material';
import '../assets/styles/Cart.css';
import { ProductsContext } from '../context/ProductsContext';
import { clearCart } from '../api/clearCart';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Cart() {
    const { products, setProducts } = useContext(ProductsContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const { setCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        setCartProducts(products.filter(product => product.cart.isExist));
    }, [products]);

    useEffect(() => {
        let localTotalPrice = 0;
        let localTotalQuantity = 0;
        for (let i = 0; i < cartProducts.length; i++) {
            localTotalPrice += cartProducts[i].price * cartProducts[i].cart.quantity;
            localTotalQuantity += cartProducts[i].cart.quantity;
        }
        setTotalPrice(localTotalPrice);
        setTotalQuantity(localTotalQuantity);
    }, [cartProducts]);

    if (!cartProducts.length) {
        return (
            <div className="cart-container">
                <h2>Your Cart</h2>
                <p className="empty-cart-message">Your cart is empty</p>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cartProducts.map(item => (
                <CartItem key={item.id} item={item} />
            ))}

            <div className="cart-summary">
                <p>Total Items: {totalQuantity}</p>
                <p>Total Price: {totalPrice} EGP</p>
            </div>

            <div className="cart-actions">
                <Button
                    onClick={async () => {
                        try {
                            await clearCart(sessionStorage.getItem('userID'));
                            setProducts(prevProducts =>
                                prevProducts.map(p => ({
                                    ...p,
                                    cart: { isExist: false, quantity: 0 }
                                }))
                            );
                        } catch (error) {
                            console.error('Failed to clear cart:', error.message);
                            alert('Failed to clear cart. Please try again.');
                        }
                    }}
                >
                    Clear Cart
                </Button>
                <Button variant="contained" color="primary"
                    style={{ background: 'var(--gradient)', position: "relative" }}
                    onClick={() => {
                        const productIds = cartProducts.map(p => {
                            const details = {
                                _id: p._id,
                                quantity: p.cart.quantity
                            }
                            return details;
                        });
                        setCart({
                            productIds: productIds,
                            price: totalPrice
                        })
                        navigate('/buy')
                    }}
                >
                    Buy Now
                </Button>

            </div>
        </div >
    );
}
