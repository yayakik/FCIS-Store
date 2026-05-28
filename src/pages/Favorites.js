import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import '../assets/styles/Favorites.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { deleteFavoriteProduct } from '../api/deleteFavoriteProduct';
import { clearFavoriteProduct } from '../api/clearFavoriteProduct';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
export default function Favorites() {
    const { setCart } = useContext(CartContext);
    const { products, setProducts } = useContext(ProductsContext);
    const [favoriteInds, setFavoriteInds] = React.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const localInds = [];
        products.forEach((product, idx) => {
            if (product.isFavorite) {
                localInds.push(idx);
            }
        });
        setFavoriteInds(localInds);
    }, [products]);


    // useEffect(() => {
    const handleRemove = (idx) => {
        const res = deleteFavoriteProduct(products[idx]._id)
        if (res) {
            let localProducts = [...products];
            localProducts[idx].isFavorite = false;
            setProducts(localProducts);
        }
    };

    const handleClear = () => {
        const res = clearFavoriteProduct();
        if (res) {
            let localProducts = [...products];
            localProducts.forEach((product) => {
                product.isFavorite = false;
            });
            setProducts(localProducts);
        }
    };

    if (favoriteInds.length === 0) {
        return (
            <div className="favorites-container">
                <h2>Your Favorites</h2>
                <p className="empty-favorites-message">No favorite products yet.</p>
            </div>
        );
    }

    return (
        <div className="favorites-container">
            <h2>Your Favorites</h2>
            <div className="favorites-list">
                {favoriteInds.map(idx => (
                    <div key={products[idx]._id} className="favorite-item">
                        <div className='favorite-item-info'>
                            <img src={products[idx].productImg} alt={products[idx].productName} />
                            <div className='favorite-item-details'>
                                <h3>{products[idx].productName}</h3>
                                <p>{products[idx].price} EGP</p>
                            </div>
                        </div>

                        <div className="favorite-actions">
                            <Button onClick={() => handleRemove(idx)} color="error" variant="outlined">
                                Remove
                            </Button>
                            <Button variant="contained" color="primary" style={{ background: 'var(--gradient)', color: 'white' }}
                                onClick={() => {
                                    setCart({
                                        productIds: [{ _id: products[idx]._id, quantity: 1 }],
                                        price: products[idx].price
                                    })
                                    navigate('/buy')
                                }}
                            >
                                Buy Now
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <Button onClick={handleClear} className="clear-favorites-btn" color="error" variant="outlined" sx={{ mb: 2 }}>
                Clear All
            </Button>
        </div>
    );
}
