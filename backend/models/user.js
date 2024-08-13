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
        default: "https://images.app.goo.gl/N7qLtMtvMVA3p6mY7",
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

