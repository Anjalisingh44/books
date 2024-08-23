const asyncHandler = require("express-async-handler");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");
const placeorder = asyncHandler(async (req, res) => {
    try {
        // Fetch the user from the database using the ID stored in the JWT
        const { id } = req.headers;
        const {order} = req.body;
        for(const orderdata of order){
const neworder = new Order({user: id, book: orderdata._id});
const orderDatafromDb = await neworder.save();
await User.findByIdAndUpdate(id,{
    $push: {orders: orderDatafromDb._id},
})
await User.findByIdAndUpdate(id,{
    $pull: { cart: orderdata._id},
})
        }
      
        
        return res.status(200).json({ status: "Success", message:"order placed successfully"});
    } catch (error) {
        console.error("Error in adding favrourites books in controller:", error); // Log detailed error
         return res.status(500).json({ message: "Server Error", error: error.message }); // Provide error details
    }
});
const getorderhistory = asyncHandler(async (req, res) => {
    try {
        // Fetch the user from the database using the ID stored in the JWT
        const { id } = req.headers;
        const userdata = await User.findById(id).populate({path:"orders",populate: {path:"book"}});
        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }
        const orderdata = userdata.orders.reverse();
        
        return res.status(200).json({ status: "Success", data:orderdata});
    } catch (error) {
        console.error("Error in getting book from orders:", error); // Log detailed error
         return res.status(500).json({ message: "Server Error", error: error.message }); // Provide error details
    }
});
const getallorder = asyncHandler(async (req, res) => {
    try {
        // Fetch the user from the database using the ID stored in the JWT
        const { id } = req.params;
        const userdata = await Order.findByIdAndUpdate(id,{status: req.body.status})

        
        return res.status(200).json({ status: "Success", data:userdata});
    } catch (error) {
        console.error("Error in getting allbook from orders:", error); // Log detailed error
         return res.status(500).json({ message: "Server Error", error: error.message }); // Provide error details
    }
});
const updatestatus = asyncHandler(async (req, res) => {
    try {
        // Fetch the user from the database using the ID stored in the JWT
        
        await Order.find().populate({path:"book"}).populate({path:"user"}).sort({ createdAt: -1});

        
        return res.status(200).json({ status: "Success", message:"status updated sucessfully"});
    } catch (error) {
        console.error("Error in getting allbook from orders:", error); // Log detailed error
         return res.status(500).json({ message: "Server Error", error: error.message }); // Provide error details
    }
});



module.exports = { placeorder,getorderhistory,getallorder,updatestatus}
