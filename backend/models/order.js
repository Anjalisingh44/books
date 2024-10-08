const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "books",
    },
    status: {
        type: String,
        default: "oder placed",
        enum: ["oder placed", "out of delivery", "Deliverd", "Cancelled"],
    },
},
{
    Timestamp: true
});
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
