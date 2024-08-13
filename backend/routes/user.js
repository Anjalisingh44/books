const express = require("express");
const {
    registerUser,loginUser,
    currentUser,updateaddress
} = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");
const router = express.Router();
router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.get("/get-user-information",validateToken,currentUser);
router.put("/update-address",validateToken,updateaddress);

module.exports = router;