import User from '../models/user.js'
import jwt from 'jsonwebtoken'

//genrating jwt

const genrateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'})

// User registeration

export const registerUser = async (req, res) =>{
    const { name, email, password, role} = req.body;

    try {
        const user = await User.create( {name, email, password, role})
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: genrateToken(user.id),
        })
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

//login User

export const loginUser= async (req,res)=>{
    const {email, password} = req.body ;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const user = await User.findOne({ email });

        if( user && (await user.matchPassword(password))){
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: genrateToken(user.id),
            })
        }else{
            res.status(401).json({ message: 'Invalid email or password' });
        }
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

