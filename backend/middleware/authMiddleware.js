import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Extract token
            token = req.headers.authorization.split(' ')[1];
            console.log('Token received:', token);//debug

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token decoded:', decoded);//debug

            // Attach user to request
            req.user = await User.findById(decoded.id).select('-password');
            console.log('User found:', req.user);//debug

            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }
            
            next();

        } catch (error) {
            console.error('Authorization error:', error.message);
            return res.status(401).json({ message: 'Not authorized' });
        }

    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();

    }
}