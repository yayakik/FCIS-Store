import React, { useState, useContext } from 'react';
import '../assets/styles/Shop.css';
import { ProductsContext } from '../context/ProductsContext';
import { FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';
import { addFavoriteProduct } from '../api/addFavoriteProduct';
import { deleteFavoriteProduct } from '../api/deleteFavoriteProduct';
import { toggleItemInCart } from '../api/toggleItemInCart';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function ProductList() {
  const { setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductsContext);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories from products
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  // Filter products by selected category                        
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div id='shop' className='shop-container'>
      <div className="products-container">
        <div className="navbar">
          <h2>Our Products</h2>
          <FormControl sx={{
            minWidth: 180, borderRadius: 2, boxShadow: '0 2px 8px rgba(26,35,126,0.08)', ml: 'auto', mb: 1, '& .MuiInputLabel-root': { color: 'var(--primary-color) !important', fontWeight: 600 },
            '& .MuiOutlinedInput-root': {
              borderRadius: 2, background: '#fff', color: 'var(--primary-color)',
              fontWeight: 600, '& fieldset': { borderColor: '#ffa500' },
              '&:hover fieldset': { borderColor: 'var(--primary-color)', background: 'transparent' },
              '&.Mui-focused fieldset': { borderColor: 'var(--secondary-color)', background: 'transparent' }
            }, '& .MuiSelect-icon': { color: '#ffa500' }
          }} size="small">
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              label="Category"
              onChange={e => setSelectedCategory(e.target.value)}
              MenuProps={{
                PaperProps: {
                  sx: {
                    color: 'var(--primary-color)',
                    '& .MuiMenuItem-root': {
                      fontWeight: 600,
                      borderRadius: 1,
                      '&.Mui-selected': {
                        color: '#fff',
                      },
                      '&:hover': {
                        background: '#ffe0b2',
                        color: 'var(--primary-color)',
                      },
                    },
                  }
                }
              }}
            >
              {categories.map(cat => (
                <MenuItem key={cat} value={cat} sx={{
                  fontWeight: 600,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    background: 'var(--gradient)',
                    color: '#fff',
                  },
                  '&:hover': {
                    background: '#ffe0b2',
                    color: '#1a237e',
                  },
                }}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="product-list">
          {filteredProducts.map(p => (
            p.numOfProduct > 0 && <div key={p._id} className="product-card">
              <div className="product-actions">
                <div className='favorite-icon'>
                  <IconButton
                    onClick={
                      () => {
                        let localProducts = [...products];
                        const productIndex = localProducts.findIndex(product => product._id === p._id);

                        if (!localProducts[productIndex].isFavorite) {  // add to favorites
                          const res = addFavoriteProduct(localProducts[productIndex]._id);
                          if (res) {
                            localProducts[productIndex].isFavorite = !localProducts[productIndex].isFavorite;
                            setProducts(localProducts);
                          }
                        }
                        else {  // remove from favorites
                          const res = deleteFavoriteProduct(localProducts[productIndex]._id);
                          if (res) {
                            localProducts[productIndex].isFavorite = !localProducts[productIndex].isFavorite;
                            setProducts(localProducts);
                          }
                        }
                      }
                    }
                    sx={{ minWidth: 0, p: 1, ml: 1 }}
                  >
                    <Favorite sx={{ color: p.isFavorite || false ? 'var(--secondary-color)' : '#ddd', transition: 'color 0.2s' }} />
                  </IconButton>
                </div>

                <div className='cart-icon'>
                  <IconButton
                    onClick={async () => {
                      const local = [...products];
                      const idx = local.findIndex(x => x._id === p._id);
                      try {
                        const res = await toggleItemInCart(p._id, sessionStorage.getItem('userID'));
                        local[idx].cart.isExist = res.added;
                        local[idx].cart.quantity = res.added ? 1 : 0;
                        setProducts(local);
                      } catch (err) {
                        console.error('Toggle failed:', err);
                      }
                    }}
                  >
                    <ShoppingCartIcon
                      sx={{
                        color: p?.cart.isExist ? 'var(--secondary-color)' : '#ddd',
                        transition: 'color 0.2s'
                      }}
                    />
                  </IconButton>



                </div>
              </div>
              <img src={p.productImg} alt={p.productName} className="product-image" />
              <div className="product-info">
                <h2>{p.productName}</h2>
                <h3>{p.category}</h3>
                <p className="product-details">{p.productDetails}</p>
                <h3 className="price">{p.price} EGP</h3>
              </div>

              <Button className='buy-now-btn' variant="contained" color="primary" style={{ background: 'var(--gradient)', color: 'white' }}
                onClick={() => {
                  setCart({
                    productIds: [{ _id: p._id, quantity: 1 }],
                    price: p.price
                  })
                  navigate('/buy')
                }}
              >
                Buy Now
              </Button>

            </div>

          ))}
        </div>
      </div>
    </div >

  );
}
