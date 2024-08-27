const mongoose = require("mongoose");
const {Schema} = mongoose;
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Enter the username"],
    },
    email: {
        type: String,
        required: [true, "Enter the email"],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        required: [true, "Enter the password"],
    },
    address: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    favourites: [
        {
            type: Schema.Types.ObjectId,
            ref: "books", 
        },
    ],
    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: "books", 
        },
    ],
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order", 
        },
    ],

}, {
    timestamps: true,
});
   const user = mongoose.model('user', userSchema);

module.exports = user;

