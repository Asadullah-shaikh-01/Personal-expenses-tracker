import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        trime: true,
        maxLength: 50,
    },

    Email: {
        type: String,
        required: true,
        trime: true,
    },
    Password: {
        type: String,
        required: true,
    },
}, { timeStamp: true })

const userModel = mongoose.model('user', userSchema)

export default userModel;