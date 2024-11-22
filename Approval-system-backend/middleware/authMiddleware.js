import jwt from 'jsonwebtoken'
import User from '../models/user.js'

//authentication of users

export const protect = async (req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return res.status(401).json({message: 'No token provided'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid Token'})
    }
        
}

//for auth roles

export const authorize = (...roles ) =>{
    return (req,res, next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(401).json({message:'You Dont Have Access of this role'})
        }
        next();
    }
}