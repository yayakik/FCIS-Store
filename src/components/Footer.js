import React from 'react';
import '../assets/styles/Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-columns">
                <div>
                    <img src={require('../assets/images/logo.png')}    alt="Your Logo" style={{width: '80px', height: '80px', marginLeft: '100px' }} />
                    <p>
                        Discover the latest laptops, desktops, and accessories tailored for work, play, and everything in between. At TechNest, we combine top-tier brands with unbeatable prices and expert support.
                        🛒 Fast Shipping | 🔒 Secure Checkout | 📞 24/7 Customer Support
                        Stay connected with us for exclusive deals and tech tips.</p>
                    <p>Call us: <strong>+123 456 789</strong></p>
                </div>
                <div>
                    <h4>Information</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/TermsAndConditions">Terms And Conditions</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h4>Support</h4>
                    <ul>
                        <li><Link to="/FAQ">FAQ</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li> 
                    </ul>
                </div>
                <div>
                    <h4>Contact</h4>
                    <p>Email: webproject@example.com</p>
                    <p>Location: Egypt, cairo</p>
                    <p>phone number:+201000000000</p>
                    <p>website: www.compusmart.com</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 YourWebsite. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
