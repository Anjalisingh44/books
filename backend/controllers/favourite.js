const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const favouritebook = asyncHandler(async (req, res) => {
    try {
        // Fetch the user from the database using the ID stored in the JWT
        const {bookid, id } = req.headers;
        const userdata = await User.findById(id);
        const isBookfavourite = userdata.favourites.includes(bookid);
        if(isBookfavourite){
            return res.status(200).json({ message: "Book is already favourite"});
        }
        await User.findByIdAndUpdate(id,{$push: {favourites:bookid}});

        return res.status(200).json({ message: "Book added to favourites" });
    } catch (error) {
        console.error("Error in adding favrourites books in controller:", error); // Log detailed error
         return res.status(500).json({ message: "Server Error", error: error.message }); // Provide error details
    }
});

const removefavouritebook = asyncHandler(async (req, res) => {
    try {
        // Fetch the user from the database using the ID stored in the JWT
        const {bookid, id } = req.headers;
        const userdata = await User.findById(id);
        const isBookfavourite = userdata.favourites.includes(bookid);
        if(isBookfavourite){
            await User.findByIdAndUpdate(id,{$pull: {favourites:bookid}});
        }
        

        return res.status(200).json({ message: "Book remove from favourites" });
    } catch (error) {
        console.error("Error in adding favrourites books in controller:", error); // Log detailed error
         return res.status(500).json({ message: "Server Error", error: error.message }); // Provide error details
    }
});
const getfavouritebook = asyncHandler(async (req, res) => {
    try {
        // Fetch the user from the database using the ID stored in the JWT
        const { id } = req.headers;
        const userdata = await User.findById(id).populate("favourites");
        const favouriteBooks = userdata.favourites;
        
        return res.status(200).json({ status: "Success", data:favouriteBooks });
    } catch (error) {
        console.error("Error in adding favrourites books in controller:", error); // Log detailed error
         return res.status(500).json({ message: "Server Error", error: error.message }); // Provide error details
    }
});




module.exports = { favouritebook, removefavouritebook, getfavouritebook}
