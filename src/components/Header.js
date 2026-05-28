import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
function Header() {
    return (
        <header className="header">
            <div className="top-bar">
                <img src={require('../assets/images/logo.png')} alt="Your Logo" style={{ width: '80px', height: '80px', marginLeft: '100px' }} />
                <div className="search-bar">
                    <input type="text" placeholder="Search Products Here ..." />
                    <button><SearchIcon /></button>
                </div>
                <div className="icons">
                    <Link to="/favorites">
                        <div className="icon-item">
                            <span><FavoriteIcon /></span>
                            <p>Favorites</p>
                        </div>
                    </Link>
                    <Link to="/cart">
                        <div className="icon-item">
                            <span><ShoppingCartIcon /></span>
                            <p>Cart</p>
                        </div>
                    </Link>
                    <Link to="/profile">
                        <div className="icon-item">
                            <span><AccountCircleIcon /></span>
                            <p>Account</p>
                        </div>
                    </Link>
                </div>

            </div>
            <nav className="nav-bar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/services">services</Link></li>
                    <li><a href="/#shop">Shop</a></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
