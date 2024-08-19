const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbconnection");
connectDb();
const app = express();

const port = process.env.PORT ||5000;
app.use(cors({
    origin: 'http://localhost:5173', // The origin of your frontend application
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Ensure 'Authorization' is included
  }));
app.use(express.json());
app.use("/api/users", require("./routes/user"));
app.use("/api/users", require("./routes/book"));
app.use("/api/users", require("./routes/favourite"));
app.use("/api/users", require("./routes/cart"));
app.use("/api/users", require("./routes/order"));

app.listen(port, ()=>{
    console.log(`server is runnng on port${port}`);
});