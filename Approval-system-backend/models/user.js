import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    //name email password role 
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    role : {
        type: String,
        enum: ['initiator', 'reviewer', 'approver'],
        required: true
    }
},
{
    timestamps: true
}
);

// userSchema.pre('save', async (next)=>{
//     if(! this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// }) // need to use a regualr funcation , so this can point to the document
userSchema.pre('save', async function(next){
    if(! this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User; //exporting User