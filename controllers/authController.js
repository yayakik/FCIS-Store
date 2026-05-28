const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;


const register = async (req, res) => {
    try {
        const { email, username, password, DOB, country } = req.body;
        if (!email || !username || !password || !DOB || !country) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            DOB,
            country,
            favorites: [],
            cart: []
        });
        await newUser.save(); // Fix: should be newUser, not user
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION || '1h' // Provide default if not set
        });
        const refreshToken = jwt.sign({ id: newUser._id }, REFRESH_TOKEN_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('jwt', refreshToken, {
            httpOnly: true,     // only accessible via HTTP(S)
            secure: true,         // HTTPS
            sameSite: 'None', // Send to domain & subdomain
            maxAge: (7 * 24 * 60 * 60) * 1000 // 7 days by ms
        });
        res.status(201).json({
            message: 'User registered successfully',
            token,
            refreshToken
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        if (email === "admin@gmail.com" && password === "fcis@2026") {
            const token = jwt.sign({ id: "admin" }, JWT_SECRET, {
                expiresIn: JWT_EXPIRATION || '1h'                // Provide default if not set
            });
            return res.status(200).json({
                message: 'Admin logged in successfully',
                token,
                role: 'admin'
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION || '1h'
        });

        const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, {
            expiresIn: '7d'
        });
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: (7 * 24 * 60 * 60) * 1000
        });
        res.status(200).json({
            message: 'User logged in successfully',
            token,
            userID: user._id,
            fav: user.favorites,
            cart: user.cart,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    register,
    login
};