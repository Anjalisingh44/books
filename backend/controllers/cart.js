const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const addtocart = asyncHandler(async (req, res) => {
    try {
        // Fetch the user from the database using the ID stored in the JWT
        const {bookid, id } = req.headers;
        const userdata = await User.findById(id);
        const isBookinCart = userdata.cart.includes(bookid);
        if(isBookinCart){
            return res.status(200).json({ message: "Book is already in cart"});
        }
        await User.findByIdAndUpdate(id,{$push: {cart:bookid}});

        return res.status(200).json({ message: "Book added to cart" });
    } catch (error) {
        console.error("Error in adding favrourites books in controller:", error); // Log detailed error
         return res.status(500).json({ message: "Server Error", error: error.message }); // Provide error details
    }
});
const removebookfromcart = asyncHandler(async (req, res) => {
    try {
        // Fetch the user from the database using the ID stored in the JWT
        const { id } = req.headers;
        const { bookid} = req.params;

        const userdata = await User.findByIdAndUpdate(id,{$pull: {cart:bookid}

        });
        
        return res.status(200).json({ message: "Book remove from cart" });
    } catch (error) {
        console.error("Error in adding favrourites books in controller:", error); // Log detailed error
         return res.status(500).json({ message: "Server Error", error: error.message }); // Provide error details
    }
});





module.exports = { addtocart,removebookfromcart}