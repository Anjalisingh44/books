const express = require("express");
const {
    addtocart,
    removebookfromcart,
    getcartbook
  
} = require("../controllers/cart");
const validateToken = require("../middleware/validateToken");
const router = express.Router();
router.put("/add-to-cart",validateToken,addtocart);
router.put("/remove-from-cart/:bookid",validateToken,removebookfromcart);
router.get("/get-from-cart",validateToken,getcartbook);


module.exports = router;