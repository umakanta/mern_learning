const express = require("express");
const app = express();
const connectDB = require("./config/db")
require("dotenv").config();

connectDB();


app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
});