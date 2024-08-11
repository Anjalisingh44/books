const express = require("express");
const { favouritebook, removefavouritebook, getfavouritebook } = require("../controllers/favourite");
const validateToken = require("../middleware/validateToken");
const router = express.Router();
router.put("/favourite-book",validateToken,favouritebook );
router.put("/remove-book-from-favourite",validateToken,removefavouritebook );
router.get("/get-book-from-favourite",validateToken,getfavouritebook );
module.exports = router;