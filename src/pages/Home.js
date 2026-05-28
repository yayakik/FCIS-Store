import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LandingSection from "../components/LandingSection";
import Shop from "../components/Shop";

export default function Home() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === '#shop') {
            const el = document.getElementById('shop');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <div>
            <LandingSection />
            <Shop />
        </div>
    );
}
