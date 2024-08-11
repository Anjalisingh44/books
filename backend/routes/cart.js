const express = require("express");
const {
    addtocart,
    removebookfromcart
  
} = require("../controllers/cart");
const validateToken = require("../middleware/validateToken");
const router = express.Router();
router.put("/add-to-cart",validateToken,addtocart);
router.put("/remove-from-cart/:bookid",validateToken,removebookfromcart);


module.exports = router;