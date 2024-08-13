const express = require("express");
const validateToken = require("../middleware/validateToken");
const { placeorder, getorderhistory, getallorder, updatestatus } = require("../controllers/order");
const router = express.Router();
router.post("/place-order",validateToken,placeorder );
router.get("/get-order-history",validateToken,getorderhistory);
router.get("/get-all-orders",validateToken,getallorder);
router.put("/update-status/:id",validateToken,updatestatus);
module.exports = router;