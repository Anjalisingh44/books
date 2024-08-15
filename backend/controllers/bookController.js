const asyncHandler = require("express-async-handler");
const Book = require("../models/book");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

//added book by admin
const bookadded = asyncHandler(async (req, res) => {
    try {
        // Fetch the user from the database using the ID stored in the JWT
        const { id } = req.headers;
        const user = await User.findById(id);

        // Check if the user exists and if they have admin privileges
        if (!user || user.role !== "admin") {
            res.status(403); // Forbidden
            throw new Error("You do not have permission to perform admin work");
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });

        await book.save();
        res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        console.error("Error in bookadded controller:", error); // Log detailed error
        res.status(500).json({ message: "Server Error", error: error.message }); // Provide error details
    }
});
//update book by admin
const updatebook = asyncHandler(async (req, res) => {
    try {
        // Fetch the user from the database using the ID stored in the JWT
        const { bookid } = req.headers;
        const user = await Book.findByIdAndUpdate(bookid,{
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });

        res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        console.error("Error in bookadded controller:", error); // Log detailed error
        res.status(500).json({ message: "Server Error", error: error.message }); // Provide error details
    }
});
const deletebook = asyncHandler(async (req, res) => {
    try {
        const {bookid} = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message:"Book deleted successfully"})
       
    
    } catch (error) {
        console.error("Error in bookdeleted controller:", error); // Log detailed error
        res.status(500).json({ message: "Server Error", error: error.message }); // Provide error details
    }
});
const getallbooks = asyncHandler(async (req, res) => {
    try {
    
        
        const books = await Book.find().sort({ createdAt: -1})
        res.status(200).json({ status:"success", data:books, });
       
    } catch (error) {
        console.error("Error to get all books:", error); // Log detailed error
        res.status(500).json({ message: "Server Error", error: error.message }); // Provide error details
    }
})
const getrecentbooks = asyncHandler(async (req, res) => {
    try {
    
        
        const books = await Book.find().sort({ createdAt: -1}).limit(4);
        res.status(200).json({ status:"success", data:books, });
       
    } catch (error) {
        console.error("Error to get all books:", error); // Log detailed error
        res.status(500).json({ message: "Server Error", error: error.message }); // Provide error details
    }
})
const getbookbyid = asyncHandler(async (req, res) => {
    try {
        // Fetch the user from the database using the ID stored in the JWT
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        res.status(200).json({ status: "success" , data:book});
    } catch (error) {
        console.error("Error in getbook by id controller:", error); // Log detailed error
        res.status(500).json({ message: "Server Error", error: error.message }); // Provide error details
    }
});



module.exports = { bookadded, updatebook, deletebook, getallbooks,getrecentbooks,getbookbyid };
