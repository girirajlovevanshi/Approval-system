import User from '../models/User.js'
import jwt from 'jsonwebtoken'

//Registation of a User
export const registerUser = async(req, res)=>{
    const {name, email , password, role} = req.body
    try {
        if( !name || !email || !password){
            return res.status(400).json({message: "All Field Required"})
        }

    // is User already exist
    const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists, Login Now' });
        }

    //Creating a new user
    const user = await User.create({ name, email, password, role})
    res.status(201).json({message: "User Registration done successfully"})
    } catch (error) {
        res.status(500).json({message: "Error During Registration"})
    }
}

//genrating JWT tokens
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: '2d'})
}

//Login
export const loginUser = async (req, res)=>{
    const {email, password}= req.body
    try {
        // checking email password
        if(!email || !password){
            return res.status(400).json({message:"Email and Password are required"})
        }
        // Finding user by email
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({ message: 'Invalid email' });
        }
        // matching password
        const isMatch = await user.matchPassword(password)
        if(!isMatch){
            return res.status(401).json({message: 'Invaild Password'});
        }
        res.json({
                _id : user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
        })
    } catch (error) {
        console.error('Error occurs during login:', error.message);
        res.status(500).json({ message: error.message });
    }
}