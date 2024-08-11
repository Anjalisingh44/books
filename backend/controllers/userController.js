const asyncHandler = require("express-async-handler");
 const bcrypt = require("bcrypt");
 const User = require("../models/user");
 const jwt = require("jsonwebtoken");
 const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, address } = req.body;
  
    if (!username || !email || !password || !address) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
  
    if (userAvailable) {
      res.status(400);
      throw new Error("User already registered");
    }
  
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password", hashedPassword);
  
    try {
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        address,
      });
  
      console.log(`User created ${user}`);
      res.status(201).json({ _id: user.id, email: user.email });
    } catch (error) {
      res.status(400);
      throw new Error("User data is not valid");
    }
  });
  const loginUser = asyncHandler(async (req,res) =>{
    const {email, password} = req.body;
    if (!email || ! password){
       res.status(400); 
       throw new Error("all the fields are mandatory");
    }
    const user = await User.findOne({email});
    // compare password with hash password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken =  jwt.sign(
            {
            user:{
                username: user.username,
                email: user.email, 
                 id: user.id,
                 role: user.role,
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1d"}
    );
        res.status(200).json({id: user.id, role:user.role,accessToken:accessToken});
    }
    else{
        res.status(401)
        throw new Error("email or password is not valid");
    }

});
const currentUser = asyncHandler(async (req, res) => {
    try {
        // Fetch the user from the database using the ID stored in the JWT
        const user = await User.findById(req.user.id).select("-password");

        // Check if the user exists
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        // Return the full user object
        res.status(200).json(user);
    } catch (error) {
        res.status(500);
        throw new Error("Server Error");
    }
});
const updateaddress= asyncHandler(async (req, res) => {
    try {
        const {id} = req.headers;
        const {address} = req.body;
        // Fetch the user from the database using the ID stored in the JWT
        const user = await User.findByIdAndUpdate(id, {address: address});

        // Check if the user exists
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        // Return the full user object
        res.status(200).json({message: "Address updated successfully"});
    } catch (error) {
        res.status(500);
        throw new Error("Server Error");
    }
});
  module.exports = {registerUser, loginUser, currentUser, updateaddress}