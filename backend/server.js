const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbconnection");
connectDb();
const app = express();

const port = process.env.PORT ||5000;
app.use(express.json());
app.use("/api/users", require("./routes/user"));
app.use("/api/users", require("./routes/book"));
app.use("/api/users", require("./routes/favourite"));
app.use("/api/users", require("./routes/cart"));
app.use("/api/users", require("./routes/order"));

app.listen(port, ()=>{
    console.log(`server is runnng on port${port}`);
});