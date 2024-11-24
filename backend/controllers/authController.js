import User from '../models/User.js'

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
            return res.status(400).json({ message: 'User already exists' });
        }

    //Creating a new user
    const user = await User.create({ name, email, password, role})
    res.status(201).json({message: "User Registration done successfully"})
    } catch (error) {
        res.status(500).json({message: "Error During Registration"})
    }
}
