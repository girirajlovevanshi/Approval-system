import mongoose from 'mongoose'
import bycrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['initiator', 'reviewer', 'approver'], // Allowed roles
        default: 'initiator',
        required: true,
    },
},
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next()
    }
    this.password = await bycrypt.hash(this.password, 10)
})

export default mongoose.model('User', userSchema);