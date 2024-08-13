const express = require("express");
const {
    
    bookadded,
    updatebook,
    deletebook,
    getallbooks,
    getrecentbooks,
    getbookbyid
} = require("../controllers/bookController");
const validateToken = require("../middleware/validateToken");
const router = express.Router();
router.post("/add-book",validateToken,bookadded );
router.put("/update-book",validateToken,updatebook );
router.delete("/delete-book",validateToken,deletebook );
router.get("/get-all-book",getallbooks);
router.get("/get-recent-book",getrecentbooks);
router.get("/get-book-by-id/:id",getbookbyid);

module.exports = router;