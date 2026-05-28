import React from 'react';
import { Box, Typography, Button, GlobalStyles } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

// Example laptop images (replace with your own or use from assets/images)
import landingImg1 from '../assets/images/landing-img2.webp';
import landingImg2 from '../assets/images/landing-img1.webp';
import logo from '../assets/images/logo.png';


const slides = [
    {
        image: landingImg1,
        title: 'Powerful Laptops for Work & Play',
        description: 'Discover the latest high-performance laptops for professionals and gamers. Shop top brands with exclusive deals!'
    },
    {
        image: landingImg2,
        title: 'Sleek Designs, Ultimate Portability',
        description: 'Find ultra-thin, lightweight laptops perfect for students and travelers. Unbeatable prices and fast shipping.'
    },
    {
        image: logo,
        title: 'Welcome to FCIS Store',
        description: 'Your one-stop shop for all things laptops. Expert support, secure checkout, and more.'
    }
];

export default function LandingSection() {
    return (
        <>
            <GlobalStyles styles={{
                '.swiper-pagination-bullet': {
                    background: 'var(--primary-color)',
                    opacity: 0.5,
                },
                '.swiper-pagination-bullet-active': {
                    opacity: 1,
                }
            }} />
            <Box sx={{ width: '100%', minHeight: 420, background: 'linear-gradient(to bottom,rgba(255, 166, 0, 0.6) 0%,rgba(255, 166, 0, 0.3) 40%, #fff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop
                    style={{ width: '90%', maxWidth: 1200, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
                >
                    {slides.map((slide, idx) => (
                        <SwiperSlide key={idx}>
                            <Box sx={{ display: 'flex', gap: '20px', minHeight: 420, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', p: 4, background: '#fff', borderRadius: 4 }}>
                                <Box sx={{ flex: 1, height: '100% !important' }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 2,
                                            color: '#1a237e',
                                            fontFamily: 'Montserrat, Rubik, Segoe UI, Arial, sans-serif',
                                            letterSpacing: 2,
                                            textShadow: '0 2px 8px rgba(26,35,126,0.08)',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        {slide.title}
                                    </Typography>
                                    <Typography variant="h6" sx={{ mb: 3, color: '#374151' }}>{slide.description}</Typography>
                                    <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 8, fontWeight: 600, background: "var(--gradient)", color: "white" }}>
                                        <a href="#shop" style={{ textDecoration: 'none', color: 'inherit' }}>Shop Now</a>
                                    </Button>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                                    <img src={slide.image} alt={slide.title} style={{ maxHeight: '300px', height: 'auto', maxWidth: "100%", width: 'auto', borderRadius: 12 }} />
                                </Box>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </>
    );
}
