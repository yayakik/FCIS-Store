import { Routes, Route, Outlet } from 'react-router-dom';
import './assets/styles/App.css';
import Login from './pages/Login.js';
import Profile from './pages/Profile.js';
import Register from './pages/Register.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Contact from './pages/Contact.js';
import PrivacyPolicy from './components/PrivacyPolicy.js';
import FAQ from './components/FAQ.js';
import TermsAndConditions from './components/TermsAndConditions.js';
import CartProvider from './context/CartProvider.js';
import Cart from './pages/Cart';
import BuyNow from './components/BuyNow';
import Home from './pages/Home.js';
import AdminDashboard from './pages/AdminDashboard';
import ProductsProvider from './context/ProductsProvider.js';
import Favorites from './pages/Favorites.js';
import Services from './pages/Services';
import PrivateRoute from './components/PrivateRoute.js';
// Layout component that includes Header and Footer
const Layout = () => {
    return (
        <>
            <PrivateRoute>
                <Header />
                <Outlet />
                <Footer />
            </PrivateRoute>
        </>
    );
};

function App() {
    return (
        <div className="App">
            <ProductsProvider>
                <CartProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route path="/admin" element={
                            < PrivateRoute>
                                <AdminDashboard />
                            </PrivateRoute>
                        } />

                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/FAQ" element={<FAQ />} />
                            <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/buy" element={<BuyNow />} />
                            <Route path="/services" element={<Services />} />
                        </Route>
                    </Routes>
                </CartProvider>
            </ProductsProvider>
        </div >
    );
}
export default App;
